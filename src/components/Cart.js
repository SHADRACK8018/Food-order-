import './styles/Cart.css';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from './CartCard';
import { CartContext } from './CartContext';

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cartItems } = useContext(CartContext);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
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

  // 🔥 Filter items with quantity > 0
  const cartItemsToDisplay = menuItems.filter(
    (item) => cartItems[item.id] && cartItems[item.id] > 0
  );

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={onClose} className="close-btn">✖</button>
      </div>

      <div className="cart-body">
        {cartItemsToDisplay.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartItemsToDisplay.map((item) => (
            <CartCard key={item.id} item={item} quantity={cartItems[item.id]} />
          ))
        )}
      </div>

      <div className="cart-footer">
        <button
          className="checkout-button"
          onClick={handleCheckout}
          disabled={cartItemsToDisplay.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
