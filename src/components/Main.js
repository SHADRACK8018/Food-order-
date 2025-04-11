import React, { useEffect, useState } from 'react';
import './styles/Main.css';
import MenuCard from './MenuCard';
import Navbar from './Navbar';

const Main = () => {
  const [menuItem, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="app">
      <Navbar/>
      {/* <h1 className="title">Our Menu</h1> */}
      <div className="menu-grid">
        {menuItem.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Main;