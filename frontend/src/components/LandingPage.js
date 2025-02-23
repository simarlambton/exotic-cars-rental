import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="welcome-message">
        <h1>Welcome to Exotic Cars Rental</h1>
        <p>Rent the most luxurious and exotic cars in the world.</p>
      </div>
      <div className="auth-buttons">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Signup</button>
      </div>
    </div>
  );
};

export default LandingPage;