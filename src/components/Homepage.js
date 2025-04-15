import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Homepage.css';

const apiUrl = process.env.REACT_APP_API_URL;

const Homepage = () => {
  const submitAddress = () => {
    // Placeholder function for now
    console.log('Address submitted!');
  };

  return (
    <div className="home">
      <div>
        <div className="header">
          <div className="header-title">BiteGo</div>
          <div className="auth-buttons">
            <a href={`${apiUrl}/login`}>
              <button>Login</button>
            </a>
            <button onClick={() => window.location.href = `${apiUrl}/register`}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <h1>Welcome to BiteGo</h1>
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
        alt="Delicious Food"
      />

      <div className="overlay">
        <input
          type="text"
          id="addressInput"
          placeholder="Enter delivery address"
        />
        <button onClick={submitAddress}>Add</button>
      </div>
    </div>
  );
};

export default Homepage;
