import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Testimonials from '../../components/testimonials/Testimonials';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to LearnIt</h1>
          <p>LearnIt :GROW  AND RISE</p>
          <button onClick={()=> navigate("/courses")} className="common-btn">Get Started</button>
          </div>
      </div>
      <Testimonials/>
    </div>
  );
};

export default Home;