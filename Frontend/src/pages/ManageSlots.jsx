import React, { useEffect, useState } from "react";
import { db } from "../../../Backend/firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, addDoc, query, orderBy, limit } from "firebase/firestore";
import "./ManageSlots.css";

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "slots"), (snapshot) => {
      const slotsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSlots(slotsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCancelSlot = async (slotId) => {
    try {
      await deleteDoc(doc(db, "slots", slotId));
      console.log(`Slot ${slotId} deleted successfully.`);

      // Check waiting list for next person
      const waitingListQuery = query(collection(db, "waiting_list"), orderBy("timestamp"), limit(1));
      const waitingListSnapshot = await getDocs(waitingListQuery);

      if (!waitingListSnapshot.empty) {
        const firstInWaiting = waitingListSnapshot.docs[0];
        const { name, registerNumber, email, urgent } = firstInWaiting.data();

        // Add first waiting person to slots
        await addDoc(collection(db, "slots"), {
          name,
          registerNumber,
          email,
          urgent,
          time: new Date().toLocaleTimeString(),
          date: new Date().toISOString().split("T")[0],
          status: "booked",
        });

        // Remove from waiting list
        await deleteDoc(doc(db, "waiting_list", firstInWaiting.id));
        console.log(`Moved ${email} from waiting list to slots.`);
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <div className="manage-slots-container">
      <h2>Manage Slots</h2>
      {loading ? (
        <p>Loading slots...</p>
      ) : slots.length === 0 ? (
        <p>No slots available.</p>
      ) : (
        <ul className="slot-list">
          {slots.map((slot) => (
            <li key={slot.id} className="slot-item">
              <span className="slot-info">
                {slot.time} | <strong>Booked By:</strong> {slot.name || "N/A"}
              </span>
              <button className="cancel-button" onClick={() => handleCancelSlot(slot.id)}>
                −
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageSlots;
