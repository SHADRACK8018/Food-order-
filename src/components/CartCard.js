import React, { useContext } from 'react';
import { CartContext, CartContextProvider } from './CartContext';

function CartCard({ item }) {
  const {addtoCart, cartItems, removefromCart} = useContext(CartContext)

  const cartItemCounter=cartItems?.[item.id];

  return (
    <div className="menu-card">
      <img className="item-image" alt='food' src={item.image} />
      <h2 className="item-title">{item.title}</h2>
      <p className="item-price"><b>${item.price.toFixed(2)}</b></p>
      <div className="menu-card-buttons">
        <button className="add-to-cart" onClick={() => addtoCart(item.id)}>+{cartItemCounter}</button>
        <button className="remove-from-cart" onClick={() => removefromCart(item.id)}>-</button>
        <button className="favorite">❤️ Favorite</button>
      </div>
    </div>
  );
}

export default CartCard;