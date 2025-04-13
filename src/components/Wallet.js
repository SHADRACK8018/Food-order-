import React from 'react';
import './styles/Wallet.css';

const Wallet = () => {
    
  return (
    <div className="wallet-container">
        <h3>Profile</h3>

      <div className="wallet-balance-card">
        <p className="wallet-label">BiteGo Cash</p>
        <h2 className="wallet-amount">KES 0.00</h2>
      </div>

      
    </div>
  );
};

export default Wallet;
