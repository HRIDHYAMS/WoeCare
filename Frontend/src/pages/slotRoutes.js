import { collection, getDocs, query, where, addDoc, orderBy, limit, doc, updateDoc, deleteDoc } from "firebase/firestore";
import express from "express";
import { db } from "../../firebase.js"; 

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
        console.log("Received request body:", req.body);

        const { name, registerNumber, email, urgent } = req.body;

        if (!name || !registerNumber || !email || urgent === undefined) {
            console.log("Missing required parameters:", { name, registerNumber, email, urgent });
            return res.status(400).json({ error: "Missing required parameters" });
        }

        console.log("Checking if email already has a booked slot...");
        const slotsCollection = collection(db, "slots");
        const existingSlotQuery = query(slotsCollection, where("email", "==", email));
        const existingSlotSnapshot = await getDocs(existingSlotQuery);

        if (!existingSlotSnapshot.empty) {
            console.log("User has already booked a slot:", email);
            return res.status(400).json({ error: "You have already booked a slot." });
        }

        console.log("Checking total slots count...");
        const slotsSnapshot = await getDocs(slotsCollection);
        const totalSlotsCount = slotsSnapshot.size;
        console.log(`Total slots count: ${totalSlotsCount}`);

        if (totalSlotsCount >= MAX_SLOTS) {
            if (urgent) {
                console.log("Slots are full. Checking for non-urgent slots to replace...");

                const nonUrgentSlotQuery = query(slotsCollection, where("urgent", "==", false), limit(1));
                const nonUrgentSlotSnapshot = await getDocs(nonUrgentSlotQuery);

                if (!nonUrgentSlotSnapshot.empty) {
                    const nonUrgentSlotDoc = nonUrgentSlotSnapshot.docs[0];
                    const nonUrgentSlotRef = doc(db, "slots", nonUrgentSlotDoc.id);
                    await updateDoc(nonUrgentSlotRef, {
                        name,
                        registerNumber,
                        email,
                        urgent: true,
                        time: new Date().toISOString(),
                    });

                    console.log("Urgent slot booked by replacing a non-urgent booking.");
                    return res.status(200).json({ message: "Urgent slot booked by replacing a non-urgent booking" });
                }
            }

            console.log("No non-urgent slots available. Adding to waiting list...");
            await addDoc(collection(db, "waiting_list"), {
                name,
                registerNumber,
                email,
                urgent,
                timestamp: new Date(),
            });

            console.log("Added to waiting list successfully");
            return res.status(200).json({ message: "Slots are full. You have been added to the waiting list." });
        }

        console.log("Generating new slot ID...");
        const latestSlotQuery = query(slotsCollection, orderBy("slotId", "desc"), limit(1));
        const latestSlotSnapshot = await getDocs(latestSlotQuery);
        let newSlotId = 1;
        if (!latestSlotSnapshot.empty) {
            newSlotId = latestSlotSnapshot.docs[0].data().slotId + 1;
        }

        console.log(`New slot ID: ${newSlotId}`);

        const now = new Date();
        const time = now.toLocaleTimeString();
        const date = now.toISOString().split("T")[0];

        console.log(`Booking slot: ID=${newSlotId}, Name=${name}, Email=${email}, Urgent=${urgent}, Time=${time}, Date=${date}`);

        await addDoc(slotsCollection, {
            slotId: newSlotId,
            name,
            registerNumber,
            email,
            urgent,
            time,
            date,
            status: "booked",
        });

        console.log("Slot booked successfully");
        return res.status(200).json({ message: "New slot booked successfully", slotId: newSlotId });

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
