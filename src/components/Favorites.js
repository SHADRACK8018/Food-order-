import React, { useContext } from 'react';
import MenuCard from './MenuCard'
import './styles/Favorites.css';
import { CartContext } from './CartContext';

const Favorites = () => {
  const [ favorites ] = useContext(CartContext);


  return (
    <div className='favorites-page'>
      {favorites.length === 0 ? (<p>Dont have any favorites yet? Go to our Menu and pick your favorite food!! Ama too bad we dont have Ugali Sukuma for you. 😢</p>) : (
        <div className="favorites-menu-grid">
          {favorites.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
