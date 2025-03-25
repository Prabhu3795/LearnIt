import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Testimonials from '../../components/testimonials/Testimonials';
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-tagline"
          >
            Grow And Rise With Our Expert Courses
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to LEARNIT
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Grow And Rise With Our Expert Courses
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={() => navigate("/courses")} 
              className="cta-button"
            >
              Get Started
              <span className="arrow">→</span>
            </button>
          </motion.div>
        </div>
      </div>
      
      <Testimonials />
    </div>
  );
};

export default Home;