
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "./HomePage.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const HomePage = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    
    <div className="homepage">
      <div className="navbar-container">
        <nav className="navbar">
          <h2></h2>
          <div className="nav-links">
            <a onClick={() => scrollToSection("hero")} className="nav-item">Home</a>
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/signup" className="nav-item">Sign Up</Link>
            <a onClick={() => scrollToSection("about")} className="nav-item">About</a>
            <a onClick={() => scrollToSection("contact")} className="nav-item">Contact</a>
          </div>
        </nav>
      </div>

      {console.log('Hero section rendering')}
      {console.log(document.querySelector('.hero'))}

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
      >
        <div className="hero-content">
          <h1>WoeCare</h1>
          <p>Your trusted platform for mental well-being and emotional support.</p>
          <button onClick={() => scrollToSection("whats-here")} className="explore-btn">
            Explore
          </button>
        </div>
        <motion.img
          src={"wc.png"}
          alt="WoeCare"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInRight}
        />
      </motion.section>
      <section id="whats-here" className="whats-here">
      <h2>What’s here</h2>
      <p>Discover the features of WoeCare that help you track and improve your mental well-being.</p>
      </section>

      {/* Feature Sections */}
      {[
        {
          id: "test",
          title: " Mental Health Test",
          description:
            "Understand your mental health through our AI-powered self-assessment. Our test helps identify stress, anxiety, and emotional states by analyzing your responses and providing personalized insights. Take control of your well-being with data-driven analysis.",
          img: "test-image.png",
          reverse: false,
        },
        {
          id: "woebot",
          title: " Chat with Woebot",
          description:
            "Woebot is your personal AI-powered mental health companion. Engage in real-time conversations to share your thoughts and feelings. Woebot listens, provides thoughtful responses, and offers self-care strategies tailored to your needs.",
          img: "woebot-image.png",
          reverse: true,
        },
        {
          id: "therapy",
          title: " Consult a Therapist",
          description:
            "Connect with certified mental health professionals and book therapy sessions at your convenience. Our platform makes it easy to find the right therapist for your needs, ensuring a safe space for healing and growth.",
          img: "therapy-image.png",
          reverse: false,
        },
      ].map((section) => (
        <motion.section
          key={section.id}
          className={`feature-section ${section.reverse ? "reverse" : ""}`}
          id={section.id}
        >
          <motion.img
            src={section.img}
            alt={section.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={section.reverse ? fadeInLeft : fadeInRight}
          />
          <motion.div
            className="feature-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
          >
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </motion.div>
        </motion.section>
      ))}

      {/* About Section */}
      <motion.section
        className="about"
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
        >
          About WoeCare
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
        >
          At WoeCare, we believe mental health is just as important as physical health.
          Our mission is to provide accessible, reliable, and compassionate support
          for your emotional well-being. We offer tools and resources that empower
          individuals to understand their mental health, seek timely help, and grow
          through reflection and self-care.
        </motion.p>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
        >
          Through AI-driven analysis, real-time conversations, and certified therapist
          connections, we aim to reduce the stigma surrounding mental health. WoeCare
          is not just a platform — it’s a movement toward a more mindful, supportive,
          and understanding world.
        </motion.p>
      </motion.section>


      {/* Contact Section */}
      <motion.section
        className="contact"
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
      >
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 WoeCare | All Rights Reserved | Privacy Policy</p>
      </footer>
    </div>
  );
};

export default HomePage;
