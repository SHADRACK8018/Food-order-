import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function CartCard({ item, quantity }) {
  const { addtoCart, cartItems, removefromCart, toggleFavorite, isFavorite } = useContext(CartContext);

  const cartItemCounter = cartItems?.[item.id] || 0;
  const favorited = isFavorite(item.id);

  console.log("Rendering CartCard for item:", item);

  return (
    <div className="menu-card">
      <img className="item-image" alt="food" src={item.image_url} />
      <h2 className="item-title">{item.name}</h2>
      <p className="item-description">{item.description}</p>
      <p className="item-price"><b>${item.price}</b></p>
      <div className="menu-card-buttons">
        <button className="add-to-cart" onClick={() => addtoCart(item.id)}><p>Quantity: {quantity}</p></button>
        <button className="remove-from-cart" onClick={() => removefromCart(item.id)}>-</button>
        <button className="favorite" onClick={() => toggleFavorite(item)}>
          {favorited ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
        </button>
      </div>
    </div>
  );
}

export default CartCard;
