import React from 'react';
// import ReactDOM from 'react-dom/client';
import './styles/Main.css';
import MenuCard from './MenuCard';
import Navbar from './Navbar'
import Footer from './Footer';

const menuItems = [
  { id: 1, name: 'Chicken Burger', price: 10.992 },
  { id: 2, name: 'Veggie Pizza', price: 12.495 },
  { id: 3, name: 'Beef Tacos', price: 9.999 },
];

function Main() {
  return (
    <div className="app">
      <Navbar/>
      {/* <h1 className="title">Our Menu</h1> */}
      <div className="menu-grid">
        {menuItems.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Main;