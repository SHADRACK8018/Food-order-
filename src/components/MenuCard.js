import React, { useContext } from 'react';
import { CartContext, CartContextProvider } from './CartContext';

function MenuCard({ item }) {
  const {addtoCart, cartItems, removefromCart} = useContext(CartContext)

  const cartItemCounter=cartItems?.[item.id];

  return (
    <div className="menu-card">
      <h2 className="item-title">{item.title}</h2>
      <img className="item-image" alt='food' src={item.image} />
      <p className="item-price"><b>${item.price.toFixed(2)}</b></p>
      <div className="menu-card-buttons">
        <button className="add-to-cart" onClick={() => addtoCart(item.id)}>Add to Cart{cartItemCounter > 0 ? ` (${cartItemCounter})` : ""}</button>
        <button className="favorite">❤️ Favorite</button>
      </div>
    </div>
  );
}

export default MenuCard;