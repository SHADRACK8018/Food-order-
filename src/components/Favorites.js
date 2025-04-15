import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { AiFillHeart } from 'react-icons/ai';
import './styles/Favorites.css';

function Favorites() {
  const { favorites, addtoCart, removefromCart, cartItems } = useContext(CartContext);

  return (
    <div className="favorites-container">
      <h1>❤️ Favorite Items</h1>
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>No favorite items yet.</p>
      ) : (
        favorites.map((item) => (
          <div key={item.id} className="favorite-item">
            <img src={item.image_url} alt={item.name} />
            <div className="favorite-details">
              <div className="favorite-title">{item.name}</div>
              <div className="favorite-description">{item.description}</div>
              <div className="favorite-price">${item.price.toFixed(2)}</div>
              <div className="favorite-buttons">
                <button className="add" onClick={() => addtoCart(item.id)}>
                  Add to Cart ({cartItems?.[item.id] || 0})
                </button>
                <button className="remove" onClick={() => removefromCart(item.id)}>-</button>
                <button className="heart"><AiFillHeart color="red" /></button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;