import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import "./ManageSlots.css";

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);
  const [cancelledSlots, setCancelledSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch active slots (real-time) and cancelled slots (once)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "slots"), async (snapshot) => {
      const slotsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSlots(slotsData);

      // Fetch cancelled slots separately
      const cancelledSnapshot = await getDocs(collection(db, "cancelled_slots"));
      const cancelledData = cancelledSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCancelledSlots(cancelledData);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCancelSlot = async (slotId) => {
    try {
      // Get slot data before deleting
      const slotDoc = await getDocs(query(collection(db, "slots")));
      const slotToCancel = slotDoc.docs.find((d) => d.id === slotId);

      if (slotToCancel) {
        const slotData = slotToCancel.data();

        // Step 1: Add to 'cancelled_slots'
        await addDoc(collection(db, "cancelled_slots"), {
          cancelledBy: slotData.email,
          name: slotData.name || "N/A",
          time: slotData.time,
          date: slotData.date || new Date().toISOString().split("T")[0],
          cancelledAt: new Date().toISOString()
        });

        // Step 2: Delete from 'slots'
        await deleteDoc(doc(db, "slots", slotId));
        console.log(`Slot ${slotId} canceled and moved to cancelled_slots.`);

        // Step 3: Assign next in waiting list if exists
        const waitingListQuery = query(collection(db, "waiting_list"), orderBy("timestamp"), limit(1));
        const waitingListSnapshot = await getDocs(waitingListQuery);

        if (!waitingListSnapshot.empty) {
          const firstInWaiting = waitingListSnapshot.docs[0];
          const { name, registerNumber, email, urgent } = firstInWaiting.data();

          await addDoc(collection(db, "slots"), {
            name,
            registerNumber,
            email,
            urgent,
            time: new Date().toLocaleTimeString(),
            date: new Date().toISOString().split("T")[0],
            status: "booked",
          });

          await deleteDoc(doc(db, "waiting_list", firstInWaiting.id));
          console.log(`Moved ${email} from waiting list to slots.`);
        }
      }
    } catch (error) {
      console.error("Error canceling slot:", error);
    }
  };

  return (
    <div className="manage-slots-container">
      <h2>Manage Slots</h2>

      {loading ? (
        <p>Loading slots...</p>
      ) : (
        <>
          {/* Active Slots */}
          <h3> Booked Slots</h3>
          {slots.length === 0 ? (
            <p>No active slots available.</p>
          ) : (
            <ul className="slot-list">
              {slots.map((slot) => (
                <li key={slot.id} className="slot-item">
                  <span className="slot-info">
                         {slot.date} | {slot.time} | <strong>Booked By:</strong> {slot.name || "N/A"}
                           </span>
                  <button className="cancel-button" onClick={() => handleCancelSlot(slot.id)}>
                    −
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Cancelled Slots */}
          <h3>Cancelled Slots</h3>
          {cancelledSlots.length === 0 ? (
            <p>No slots have been canceled.</p>
          ) : (
            <ul className="slot-list cancelled">
              {cancelledSlots.map((slot) => (
                <li key={slot.id} className="slot-item cancelled">
                  <span className="slot-info">
                    {slot.time} | <strong>Cancelled By:</strong> {slot.name || "N/A"} ({slot.cancelledBy})
                  </span>
                  <span className="cancelled-at">
                    <em>Cancelled on: {new Date(slot.cancelledAt).toLocaleString()}</em>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ManageSlots;
