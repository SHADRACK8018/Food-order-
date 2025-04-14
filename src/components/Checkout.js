// Checkout.js
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/menu')
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  const checkoutItems = menuItems.filter(item => cartItems[item.id] > 0);

  const total = checkoutItems.reduce(
    (acc, item) => acc + item.price * cartItems[item.id],
    0
  );

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <ul>
        {checkoutItems.map(item => (
          <li key={item.id}>
            {item.name} — ${item.price} x {cartItems[item.id]}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button>Place Order</button>
    </div>
  );
};

export default Checkout;
