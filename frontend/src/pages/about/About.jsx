import React from 'react'
import "./about.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const About = () => {
    const navigate = useNavigate();
  return (
   <div className="about">
     <div className="about-content">
        <h2>About Us</h2>
        <p>
            We are an online learning platform that offers courses on various subjects. Our mission is to provide quality education to everyone at an affordable price. We believe that education is the key to success and we want to make it accessible to everyone.
        </p>
     </div>
   </div>
  );
};

export default About