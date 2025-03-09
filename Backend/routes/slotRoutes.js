import { collection, getDocs, query, where, addDoc, orderBy, limit, doc, updateDoc, deleteDoc } from "firebase/firestore";
import express from "express";
import { db } from "../firebase.js"; 

const router = express.Router();

router.get("/available", async (req, res) => {
    try {
        const slotsCollection = collection(db, "slots");
        const slotsQuery = query(slotsCollection, where("status", "==", "booked"));
        const slotsSnapshot = await getDocs(slotsQuery);

        const slots = slotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const MAX_SLOTS = 5;

router.post("/book", async (req, res) => {
    try {
        console.log("Booking slot...");

        const { bookedBy, email, registerNumber } = req.body;  // Added registerNumber
        if (!bookedBy || !email || !registerNumber) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const slotsCollection = collection(db, "slots");
        const bookedSlotsQuery = query(slotsCollection, where("status", "==", "booked"));
        const bookedSlotsSnapshot = await getDocs(bookedSlotsQuery);
        const bookedSlotsCount = bookedSlotsSnapshot.size;

        if (bookedSlotsCount >= MAX_SLOTS) {
            await addDoc(collection(db, "waiting_list"), {
                bookedBy, 
                email, 
                registerNumber,  // Store registerNumber in waiting list
                timestamp: new Date(),
            });
            return res.status(200).json({ message: "Slots are full. You have been added to the waiting list." });
        }

        const latestSlotQuery = query(slotsCollection, orderBy("slotId", "desc"), limit(1));
        const latestSlotSnapshot = await getDocs(latestSlotQuery);
        let newSlotId = 1;
        if (!latestSlotSnapshot.empty) {
            newSlotId = latestSlotSnapshot.docs[0].data().slotId + 1;
        }

        const now = new Date();
        const time = now.toLocaleTimeString();
        const date = now.toISOString().split("T")[0];

        const newSlotRef = await addDoc(collection(db, "slots"), {
            slotId: newSlotId,
            bookedBy, 
            email, 
            registerNumber,  // Store registerNumber in slots collection
            time,
            date,
            status: "booked",
        });

        return res.status(200).json({ message: "New slot booked successfully", slotId: newSlotId});
    } catch (error) {
        console.error("Error booking slot:", error);
        return res.status(500).json({ error: error.message });
    }
});


router.post("/cancel", async (req, res) => {
    try {
        const { slotId } = req.body;
        console.log("Received cancellation request for slotId:", slotId);

        const slotsCollection = collection(db, "slots");
        const slotQuery = query(slotsCollection, where("slotId", "==", Number(slotId)));
        const slotSnapshot = await getDocs(slotQuery);

        if (slotSnapshot.empty) {
            return res.status(400).json({ message: "Invalid cancellation request: Slot not found or not booked" });
        }

        const slotDoc = slotSnapshot.docs[0];
        const slotRef = doc(db, "slots", slotDoc.id);

        if (slotDoc.data().status !== "booked") {
            return res.status(400).json({ message: "Invalid cancellation request: Slot is not booked" });
        }

        const waitingListCollection = collection(db, "waiting_list");
        const waitingQuery = query(waitingListCollection, orderBy("timestamp"), limit(1));
        const waitingSnapshot = await getDocs(waitingQuery);

        if (!waitingSnapshot.empty) {
            const firstUserDoc = waitingSnapshot.docs[0];
            const firstUser = firstUserDoc.data();

            await updateDoc(slotRef, {
                status: "booked",
                bookedBy: firstUser.bookedBy,
                email: firstUser.email
            });

            await deleteDoc(doc(db, "waiting_list", firstUserDoc.id));
        } else {
            await updateDoc(slotRef, { status: "available", bookedBy: null, email: null });
        }

        res.status(200).json({ message: "Slot canceled successfully" });
    } catch (error) {
        console.error("Error canceling slot:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
