import React from 'react';

function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <h2 className="item-name">{item.name}</h2>
      <p className="item-price">${item.price.toFixed(2)}</p>
      <div className="menu-card-buttons">
        <button className="add-to-cart">Add to Cart</button>
        <button className="favorite">❤️ Favorite</button>
      </div>
    </div>
  );
}

export default MenuCard;