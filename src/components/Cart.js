import './styles/Cart.css';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from './CartCard';
import { CartContext } from './CartContext';

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // ✅ Needed for redirection
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cartItems } = useContext(CartContext);

  const handleCheckout = () => {
    onClose(); // ✅ Closes the cart popup
    navigate('/checkout'); // ✅ Navigates to your checkout page
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/food')
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={onClose} className="close-btn">✖</button>
      </div>

      <div className="cart-body">
        {menuItems.map(item =>
          cartItems[item.id] !== 0 ? <CartCard key={item.id} item={item} /> : null
        )}
      </div>

      <div className="cart-footer">
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
