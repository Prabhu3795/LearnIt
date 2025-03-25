import React from 'react';
import './header.css';
import { Link } from "react-router-dom";
import bulb from "../../assets/bulb.png";

const Header = ({ isAuth }) => {
  return (
    <header>
      <div className="logo-container">
        <div className="logo">
          LEARNIT
          <img src={bulb} alt="Bulb" className="bulb" />
        </div>
        <div className="tagline">Illuminate Your Learning Journey</div>
      </div>
      <nav className="navigation">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        {isAuth ? (
          <Link to={"/account"}>Account</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
        <Link to={"/contact"} className="contact-btn">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;