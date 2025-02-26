import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const scrollToAbout = () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <h2></h2>
        <div className="nav-links">
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/signup" className="nav-item">Sign Up</Link>
          <a href="#about" className="nav-item" onClick={scrollToAbout}>About</a>
          <Link to="/contact" className="nav-item">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>WoeCare</h1>
        <p>Your trusted platform for mental well-being and emotional support </p>
      </header>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>What's here</h2>
        <div className="steps">
          <div className="step">
            <h3>📋 Take a Self-Assessment</h3>
            <p>Answer simple questions about your mood, stress, and sleep. Get insights with AI analysis.</p>
          </div>
          <div className="step">
            <h3>🤖 Chat with Our AI Assistant</h3>
            <p>Instant support through conversations — WoeCare listens and offers self-care tips.</p>
          </div>
          <div className="step">
            <h3>📅 Book a Therapy Session</h3>
            <p>Find certified therapists and easily book sessions at your convenience.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About WoeCare</h2>
        <p>At WoeCare, we believe that mental health matters. Our mission is to make emotional well-being accessible, supportive, and stigma-free. Whether you need a listening ear, expert advice, or simple self-care tools — we’re here for you. Through AI-driven insights, compassionate conversations, and access to certified therapists, WoeCare empowers you to take charge of your mental health journey.</p>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Explore WoeCare</h2>
        <div className="feature-links">
          <Link to="/signup">Sign up</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 WoeCare | All Rights Reserved | Privacy Policy</p>
      </footer>
    </div>
  );
};

export default HomePage;
