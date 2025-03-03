import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault(); // Prevents default link behavior
    console.log("Logging out...");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>WoeCare</h1>
        <nav>
          <ul>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <h2>Admin Dashboard</h2>
        <p>Your partner in emotional well-being</p>

        <div className="dashboard-options">
          <div
            className="option-box"
            role="button"
            tabIndex="0"
            onClick={() => navigate("/questionnaire")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/questionnaire")}
          >
            <h3>Manage Users</h3>
            <p></p>
          </div>

          <div
            className="option-box"
            role="button"
            tabIndex="0"
            onClick={() => navigate("/chatbot")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/chatbot")}
          >
            <h3>Manage Therapists</h3>
            <p></p>
          </div>

          <div
            className="option-box"
            role="button"
            tabIndex="0"
            onClick={() => navigate("/slot-booking")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/slot-booking")}
          >
            <h3>Manage Appointments</h3>
            <p></p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} WoeCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
