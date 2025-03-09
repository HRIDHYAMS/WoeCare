import React from "react";
import "./Slotbooking.css";
import { Link } from "react-router-dom";

const SlotBooking = () => {
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
      </div>
    </div>
  </div>
  
  );
};

export default SlotBooking;
