import React, { useState } from 'react';
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { CourseData } from '../../context/CourseContext'; // Make sure this import exists!

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchMyCourse } = CourseData(); // Ensure this is properly destructured

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password, navigate, fetchMyCourse);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        
        <div className="social-login">
          <button className="social-btn google">
            <FaGoogle /> Continue with Google
          </button>
          <button className="social-btn facebook">
            <FaFacebook /> Continue with Facebook
          </button>
          <button className="social-btn github">
            <FaGithub /> Continue with GitHub
          </button>
        </div>
        
        <div className="divider">or</div>
        
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <button disabled={btnLoading} type="submit" className='common-btn'>
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>
        
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;