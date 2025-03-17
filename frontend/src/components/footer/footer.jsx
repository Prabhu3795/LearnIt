import React from 'react'
import './footer.css'
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2025 LearnIt | All Rights Reserved.
            </p>
            <div className="social-links">
                <a href=""><FaFacebook /></a>
                <a href=""><SiGmail /></a>
                <a href=""><FaXTwitter /></a>
                <a href=""><FaInstagramSquare /></a>
            </div>
        </div>
    </footer>
  )
}

export default Footer;