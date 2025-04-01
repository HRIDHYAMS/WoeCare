import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      {/* Full-Width Navigation Bar */}
      <nav className="woecare-dashboard-navbar">
        <h2>WoeCare</h2>
        <div className="woecare-dashboard-nav-links">
          <Link to="/login" className="woecare-dashboard-nav-item">
            Logout
          </Link>
        </div>
      </nav>

      {/* Combined Section: Title, Description on Left - Feature Links on Right */}
      <section className="woecare-dashboard-combined-section">
        <div className="woecare-dashboard-info">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to WoeCare
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            Your mental health companion — explore tools to improve well-being.
          </motion.p>
        </div>

        <div className="woecare-dashboard-feature-links">
          <motion.div
            className="woecare-dashboard-feature-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/qfirst" className="woecare-dashboard-feature-link">
              Take Mental Health Test
            </Link>
          </motion.div>
          <motion.div
            className="woecare-dashboard-feature-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/chatbot" className="woecare-dashboard-feature-link">
              Chat with Woebot
            </Link>
          </motion.div>
          <motion.div
            className="woecare-dashboard-feature-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/slotbooking" className="woecare-dashboard-feature-link">
              Consult a Therapist
            </Link>
          </motion.div>
          <motion.div
            className="woecare-dashboard-feature-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/Score" className="woecare-dashboard-feature-link">
              Your Score Details
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Full-Width Footer */}
      <footer className="woecare-dashboard-footer">
        <p>&copy; 2025 WoeCare. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Dashboard;
