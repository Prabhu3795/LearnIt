import React, { useState, useEffect } from 'react'
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const Registration = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    text: ""
  });

  useEffect(() => {
    // Password strength checker
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  }, [password]);

  const calculatePasswordStrength = (pass) => {
    if (!pass) return { strength: 0, text: "" };
    
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.length > 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    
    let text = "";
    if (strength < 2) text = "Weak";
    else if (strength < 4) text = "Medium";
    else text = "Strong";
    
    return { strength, text };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!registerUser) {
      console.error("registerUser function is not available.");
      return;
    }
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>
        
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
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
          
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          
          {password && (
            <div className="password-strength">
              <div className="strength-meter">
                <div className={`strength-meter-fill strength-${passwordStrength.text.toLowerCase()}`} />
              </div>
              <div className="strength-text">
                Password Strength: {passwordStrength.text}
              </div>
            </div>
          )}
          
          <button type='submit' disabled={btnLoading} className='common-btn'>
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>
        
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;