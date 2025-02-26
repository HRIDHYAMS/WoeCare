import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <nav className="dashboard-header">
        <h1>WoeCare</h1>
        <ul>
          <li><a href="/home" onClick={handleLogout}>Logout</a></li>
        </ul>
      </nav>

      {/* Main Section */}
      <div className="dashboard-main">
        <h2>Welcome to WoeCare</h2>
        <p>Your partner in emotional well-being</p>

        <div className="dashboard-options">
          <div className="option-box" onClick={() => navigate("/questionnaire")}>
            <h3>Mental Health Test</h3>
            <p>Take a quick assessment to understand your emotional state.</p>
          </div>
          <div className="option-box" onClick={() => navigate("/chatbot")}>
            <h3>Chat with Woebot</h3>
            <p>Engage with our AI-powered mental health companion.</p>
          </div>
          <div className="option-box" onClick={() => navigate("/slot-booking")}>
            <h3>Book a Therapist</h3>
            <p>Schedule sessions with professional mental health experts.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} WoeCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
