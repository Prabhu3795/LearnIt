import React from 'react';
import { motion } from "framer-motion";
import "./about.css";

const About = () => {
  return (
    <div className="about-section">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="about-container"
      >
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          About Us
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="about-content"
        >
          <p className="about-text">
            We are an online learning platform that offers courses on various subjects. Our mission is to provide quality education to everyone at an affordable price.
          </p>
          
          <p className="about-text">
            We believe that education is the key to success and we want to make it accessible to everyone, everywhere. Our expert instructors and interactive learning approach ensure you get the most from every lesson.
          </p>
          
          <div className="mission-values">
            <div className="value-card">
              <h3>Our Vision</h3>
              <p>To illuminate learning paths for students worldwide</p>
            </div>
            
            <div className="value-card">
              <h3>Our Approach</h3>
              <p>Interactive, engaging, and student-centered learning</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;