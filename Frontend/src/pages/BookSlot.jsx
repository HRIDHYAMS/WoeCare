import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookSlot.css"; // Ensure this CSS file exists

const BookSlot = () => {
  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    urgent: false, // Added urgent state
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [slotId, setSlotId] = useState(""); // Added slotId state
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "urgent" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = { ...formData, email, urgent: Boolean(formData.urgent) };
  
      const res = await fetch("http://localhost:3000/slots/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        if (data.waitingListPosition !== undefined && data.waitingListPosition !== null) {
          setResponseMessage(
            `Slots are full. You've been added to the waiting list. Your position: ${data.waitingListPosition}`
          );
        } else if (data.slotId) {
          setSlotId(data.slotId);
          setResponseMessage(`Slot booked successfully!`);
        } else {
          setResponseMessage(data.message || "Failed to book slot.");
        }
      } else {
        // Check for the "already booked" error message
        if (data.error === "You have already booked a slot.") {
          setResponseMessage(`User has already booked a slot: ${email}`);
        } else {
          setResponseMessage(data.error || "Failed to book slot.");
        }
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
          name="name"
          placeholder="Name"
          value={formData.name}
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

<div className="urgency-options" style={{ display: "flex", gap: "15px" }}>
  <label style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}>
    <input
      type="radio"
      name="urgent"
      value="true"
      checked={formData.urgent === true}
      onChange={handleChange}
    />
    Urgent
  </label>
  <label style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}>
    <input
      type="radio"
      name="urgent"
      value="false"
      checked={formData.urgent === false}
      onChange={handleChange}
    />
    Not Urgent
  </label>
</div>



        <button type="submit">Confirm Booking</button>
      </form>

      {responseMessage && <p className="response">{responseMessage}</p>}
      {slotId && <p className="slot-id">Your Slot ID: {slotId}</p>} {/* Displays Slot ID separately */}

      <p className="go-back-text" onClick={() => navigate("/slotbooking")}>
        ← Go Back
      </p>
    </div>
  );
}; 

export default BookSlot;
