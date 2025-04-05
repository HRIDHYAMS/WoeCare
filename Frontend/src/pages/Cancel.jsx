import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import "./Cancel.css"; // Reusing styles

const CancelSlot = () => {
  const [slot, setSlot] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email"); // Retrieve the logged-in user's email

  // Fetch user's booked slot from Firestore
  useEffect(() => {
    const fetchSlot = async () => {
      if (!email) {
        setResponseMessage("Please log in to manage your slot.");
        return;
      }

      const slotsRef = collection(db, "slots");
      const q = query(slotsRef, where("email", "==", email)); // Use "email" instead of "bookedBy"
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userSlot = querySnapshot.docs[0]; // Assuming one slot per user
        setSlot({ id: userSlot.id, ...userSlot.data() });
      } else {
        setResponseMessage("You have no booked slots.");
      }
    };

    fetchSlot();
  }, [email]);
  console.log("heo");
  // Cancel the user's booked slot
  const handleCancel = async () => {
    if (!slot) return;
  
    try {
      // Step 1: Fetch the waiting list for the slot
      const waitingListRef = collection(db, "waiting_list");
      const urgentQuery = query(waitingListRef, where("urgent", "==", true));
      const urgentSnapshot = await getDocs(urgentQuery);
  
      let memberToAssign = null;
  
      if (!urgentSnapshot.empty) {
        memberToAssign = urgentSnapshot.docs[0];
      } else {
        const nonUrgentQuery = query(waitingListRef, where("urgent", "==", false));
        const nonUrgentSnapshot = await getDocs(nonUrgentQuery);
  
        if (!nonUrgentSnapshot.empty) {
          memberToAssign = nonUrgentSnapshot.docs[0];
        }
      }
  
      if (memberToAssign) {
        const assignedMember = memberToAssign.data();
        const newSlot = {
          email: assignedMember.email,
          name: assignedMember.name,
          time: slot.time,
          urgent: assignedMember.urgent || false,
          bookedBy: assignedMember.email,
        };
  
        const newSlotRef = doc(db, "slots", slot.id);
        await setDoc(newSlotRef, newSlot);
  
        const waitingListDocRef = doc(db, "waiting_list", memberToAssign.id);
        await deleteDoc(waitingListDocRef);
  
        setResponseMessage("Your slot has been successfully canceled, and a waiting member has been assigned.");
      } else {
        setResponseMessage("No members in the waiting list to assign to the slot.");
      }
  
      // ✅ Step 2: Add to 'cancelled_slots' collection before deleting
      const cancelledSlotRef = doc(db, "cancelled_slots", slot.id);
      await setDoc(cancelledSlotRef, {
        cancelledBy: email,
        name: slot.name || "N/A",
        time: slot.time,
        cancelledAt: new Date().toISOString()
      });
  
      // ✅ Step 3: Delete the original slot
      const slotRef = doc(db, "slots", slot.id);
      await deleteDoc(slotRef);
  
      setSlot(null);
    } catch (error) {
      console.error("Error canceling slot:", error);
      setResponseMessage("Error canceling slot. Try again later.");
    }
  };
  

  return (
    <div className="cancel-slot-page">
      <div className="cancel-slot-container">
        <h2>Cancel Your Slot</h2>

        {slot ? (
          <div className="slot-details">
            <p><strong>Time:</strong> {slot.time}</p>
            <p><strong>Booked By:</strong> {email}</p>
            <button className="cancel-button" onClick={handleCancel}>Cancel Slot</button>
          </div>
        ) : (
          <p>{responseMessage}</p>
        )}

        <p className="go-back-text" onClick={() => navigate("/slotbooking")}>← Go Back</p>
      </div>
    </div>
  );
};

export default CancelSlot;``