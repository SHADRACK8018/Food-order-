import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function MenuCard({ item }) {
  const { addtoCart, cartItems, toggleFavorite, isFavorite } = useContext(CartContext);

  const cartItemCounter = cartItems?.[item.id] || 0;
  const favorited = isFavorite(item.id);

  return (
    <div className="menu-card">
      <h2 className="item-title">{item.name}</h2>
      <img className="item-image" alt="food" src={item.image_url} />
      <p className="item-description">{item.description}</p>
      <p className="item-price"><b>${item.price.toFixed(2)}</b></p>
      <div className="menu-card-buttons">
        <button className="add-to-cart" onClick={() => addtoCart(item.id)}>
          Add to Cart {cartItemCounter > 0 ? `(${cartItemCounter})` : ''}
        </button>
        <button className="favorite" onClick={() => toggleFavorite(item)}>
          {favorited ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
        </button>
      </div>
    </div>
  );
}

export default MenuCard;
