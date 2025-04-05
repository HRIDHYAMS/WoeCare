import React, { useState } from "react";
import "./Slotbooking.css";
import { Link } from "react-router-dom";

const SlotBooking = () => {
  const [slots, setSlots] = useState([]);
  const [showSlots, setShowSlots] = useState(false);

  const fetchBookedSlots = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/slots/available");
      const data = await response.json();
      if (response.ok) {
        // Assigning 1-hour slots sequentially
        let startTime = 10; // Assuming the therapist starts at 10 AM
        const updatedSlots = data.map((slot, index) => {
          const slotTime = `${startTime}:00 - ${startTime + 1}:00`;
          startTime += 1; // Increment by 1 hour
          return { ...slot, slotTime };
        });
        setSlots(updatedSlots);
        setShowSlots(true);
      } else {
        console.error("Error fetching slots:", data.error);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  return (
    <div className="woecare-slot-page">
      <div className="woecare-slot-container">
        <h1 className="woecare-slot-heading">Book your slot</h1>
        <p className="woecare-slot-description">
          Schedule an appointment with a professional psychiatrist at your convenience.
          Manage your mental well-being with ease.
        </p>
        <div className="woecare-slot-button-container">
          <Link to="/bookslot">
            <button className="woecare-slot-booking-btn">Book Slot</button>
          </Link>
          <Link to="/cancelslot">
            <button className="woecare-slot-cancel-btn">Cancel Slot</button>
          </Link>
          <Link to="/bookedslots">
            <button className="woecare-slot-view-btn">View Booked Slots</button>
          </Link>
        </div>

        {showSlots && (
          <div className="woecare-slot-list">
            <h2>Booked Slots</h2>
            <ul>
              {slots.map((slot) => (
                <li key={slot.id}>Slot ID: {slot.slotId} | Time: {slot.slotTime}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotBooking;
