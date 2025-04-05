import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"; // Ensure this points to your Firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./BookSlot.css"; // Maintain same CSS format

const AddTherapist = () => {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    email: "",
    availableTime: "" // New field for available time
  });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "therapists"), {
        ...formData,
        createdAt: serverTimestamp() // Adding timestamp field
      });
      setResponseMessage("Therapist added successfully!");
      setFormData({ name: "", education: "", email: "", availableTime: "" });
    } catch (error) {
      setResponseMessage("Error adding therapist. Please try again.");
    }
  };

  return (
    <div className="book-slot-container">
      <h2>Add a Therapist</h2>
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
          name="education"
          placeholder="Qualification"
          value={formData.education}
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
          name="availableTime"
          placeholder="Available Time (e.g., 10 AM - 4 PM)"
          value={formData.availableTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Therapist</button>
      </form>

      {responseMessage && <p className="response">{responseMessage}</p>}

      <p className="go-back-text" onClick={() => navigate("/AdminDashboard")}>
        ← Go Back
      </p>
    </div>
  );
};

export default AddTherapist;
