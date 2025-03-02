import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>WoeCare Admin Dashboard</h2>
      <div className="admin-actions">
        <button className="admin-btn">Manage Users</button>
        <button className="admin-btn">Manage Therapists</button>
        <button className="admin-btn">View Test Results</button>
        <button className="admin-btn">Monitor Woebot Chats</button>
        <button className="admin-btn">Appointment Bookings</button>
        <button className="admin-btn">Website Settings</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
