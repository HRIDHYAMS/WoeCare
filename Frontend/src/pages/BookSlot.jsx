import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookSlot.css"; // Ensure this CSS file exists

const BookSlot = () => {
  const [formData, setFormData] = useState({
    bookedBy: "",
    email: "",
    registerNumber: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [slotId, setSlotId] = useState(""); // Added slotId state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/slots/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSlotId(data.slotId); // Store the slot ID
        setResponseMessage("Slot booked successfully!");
      } else {
        setResponseMessage(data.message || "Failed to book slot.");
      }
    } catch (error) {
      setResponseMessage("Error booking slot. Please try again.");
    }
  };

  return (
    <div className="book-slot-container">
      <h2>Book a Slot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bookedBy"
          placeholder="Name"
          value={formData.bookedBy}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="registerNumber"
          placeholder="Register Number"
          value={formData.registerNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirm Booking</button>
      </form>

      {responseMessage && <p className="response">{responseMessage}</p>}
      {slotId && <p className="slot-id">Your Slot ID: {slotId}</p>} {/* Displays Slot ID separately */}

      <p className="go-back-text" onClick={() => navigate("/Slotbooking")}>
        ← Go Back
      </p>
    </div>
  );
};

export default BookSlot;
