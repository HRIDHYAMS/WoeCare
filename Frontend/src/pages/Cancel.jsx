import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cancel.css"; // Reusing the same styles

const CancelSlot = () => {
  const [slotId, setSlotId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSlotId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/slots/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId }),
      });
      const data = await res.json();
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage("Error canceling slot. Try again later.");
    }
  };

  return (
    <div className="cancel-slot-container">
      <h2>Cancel a Slot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="slotId"
          placeholder="Enter Slot ID"
          value={slotId}
          onChange={handleChange}
          required
        />
        <button type="submit">Cancel Slot</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      <p className="go-back-text" onClick={() => navigate("/")}>← Go Back</p>
    </div>
  );
};

export default CancelSlot;
