import React from "react";
import "./Slotbooking.css";
import { Link } from "react-router-dom";

const SlotBooking = () => {
  return (
    <div className="slot-booking-container">
      <h1 className="heading">Book Your Psychiatrist</h1>
      <p className="description">
        Schedule an appointment with a professional psychiatrist at your convenience.
        Manage your mental well-being with ease.
      </p>
      <div className="button-container">
        <Link to="/Bookslot">
          <button className="booking-btn">Book Slot</button>
        </Link>
        <Link to="/Cancel">
        <button className="cancel-btn">Cancel Slot</button>
        </Link>
       
      </div>
    </div>
  );
};

export default SlotBooking;
