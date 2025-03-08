import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <>
      {/* Full-Width Navigation Bar */}
      <nav className="woecare-admin-dashboard-navbar">
        <h2></h2>
        <div className="woecare-admin-dashboard-nav-links">
          <Link to="/login" className="woecare-admin-dashboard-nav-item">
            Logout
          </Link>
        </div>
      </nav>

      {/* Combined Section: Title, Description on Left - Feature Links on Right */}
      <section className="woecare-admin-dashboard-combined-section">
        <div className="woecare-admin-dashboard-info">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            WoeCare Admin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            Manage and oversee the platform efficiently.
          </motion.p>
        </div>

        <div className="woecare-admin-dashboard-feature-links">
          <motion.div
            className="woecare-admin-dashboard-feature-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/manage-users" className="woecare-admin-dashboard-feature-link">
              Manage Therapists
            </Link>
          </motion.div>
          <motion.div
            className="woecare-admin-dashboard-feature-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/view-reports" className="woecare-admin-dashboard-feature-link">
              Manage Slot Booking
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Full-Width Footer */}
      <footer className="woecare-admin-dashboard-footer">
        <p>&copy; 2025 WoeCare. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default AdminDashboard;
