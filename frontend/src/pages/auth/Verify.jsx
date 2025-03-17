import React, { useState } from 'react'
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';
const Verify = () => {
  const [otp,setOtp]=useState("") 
  const {btnLoading, verifyUser} = UserData()
  const navigate = useNavigate()
  const submitHandler = async(e) => {
    e.preventDefault();
    await verifyUser(Number(otp),navigate);
   
  }

  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Verify Account</h2>
            <form onSubmit={submitHandler}>
                    <label htmlFor="otp">OTP</label>
                    <input type="number"value={otp} onChange={e=>setOtp(e.target.value)}required/>
                    <button disablesd={btnLoading} type="submit" className='common-btn'>
                      {btnLoading?"please wait..":"Verify"}
                    </button>

            </form>
            <p>
                Go to <Link to= "/login">Login</Link>page
            </p>
        </div>
    </div>
      
  );
};

export default Verify