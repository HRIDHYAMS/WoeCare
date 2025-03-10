import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./ManageSlots.css";

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const querySnapshot = await getDocs(collection(db, "slots"));
      const slotsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSlots(slotsData);
    };

    fetchSlots();
  }, []);

  const handleCancelSlot = async (slotId) => {
    await deleteDoc(doc(db, "slots", slotId));
    setSlots(slots.filter((slot) => slot.id !== slotId));
  };

  return (
    <div className="manage-slots-container">
      <h2>Manage Slots</h2>
      <ul className="slot-list">
        {slots.map((slot) => (
          <li key={slot.id} className="slot-item">
            <span className="slot-info">
              {slot.time} | <strong>Booked By:</strong> {slot.bookedBy || "N/A"}
            </span>
            <button className="cancel-button" onClick={() => handleCancelSlot(slot.id)}>−</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSlots;
