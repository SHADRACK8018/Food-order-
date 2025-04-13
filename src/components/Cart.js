import './styles/Cart.css';
import React, { useContext, useEffect, useState } from 'react';
import CartCard from './CartCard'
import { CartContext, CartContextProvider } from './CartContext';

const Cart = ({ isOpen, onClose }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cartItems } = useContext(CartContext)

  useEffect(() => {
      fetch('http://localhost:3001/menu')
        .then((res) => res.json())
        .then((data) => {
          setMenuItems(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
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
      {menuItems.map(item => {
        if (cartItems[item.id] != 0){
          return <CartCard key={item.id} item={item} />
        }})}
      </div>
      
      <div className = "cart-footer">
        <button className = "checkout-button">Checkout</button>
        </div>
    </div>
  );
};

export default Cart;