import './styles/Cart.css';
import React from 'react';
// import CartContext from './CartContext'


const Cart = ({ isOpen, onClose }) => {
  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={onClose} className="close-btn">✖</button>
      </div>

      <div className="cart-body">
        {/* You can add your cart form or items here */}
        <p>This is your cart. Add form fields or items here.</p>
      </div>
      
      <div className = "cart-footer">
        <button className = "checkout-button">Checkout</button>
        </div>
    </div>
  );
};

export default Cart;