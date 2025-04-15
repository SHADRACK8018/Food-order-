import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import Help from './components/Help';
import './styles/Navbar.css';
import Cart from './Cart'
import { FaBars, FaSearch, FaShoppingCart,  FaHeart, FaWallet, FaQuestionCircle, FaShoppingBag, FaUser   } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="navbar">
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>

  <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
            <h2>Side</h2>
            <span className="close-btn" onClick={toggleSidebar}>
            ✖
            </span>
        </div>
        
        <div className='sidebar-body'>
            <ul>
                <li><FaShoppingBag /> <Link className="menu-item" to="/orders">Orders</Link></li>
                <li><FaHeart /> <Link className="menu-item" to="/favorites">Favorites</Link></li>
                <li><FaWallet /> <Link className="menu-item" to="/wallet">Wallet</Link></li>
                <li><FaQuestionCircle /> <Link className="menu-item" to="/help">Help</Link></li>
                <li><FaUser  /> <Link className="menu-item" to="http://localhost:5000/account">Account</Link></li>
            </ul>
        </div>
      <div className="sidebar-footer">
        <button
    className="signout"
    onClick={() => {
      fetch("http://localhost:5000/logout", {

      })
        .then(() => {
          localStorage.removeItem("user");
          navigate("/");
        })
        .catch((err) => {
          console.error("Logout failed", err);
        });
    }}
  >
    Logout
  </button>
       </div>
  
  </div>
  
  <div className="navbar-title">BiteGo</div>

  <div className="navbar-search">
    <label htmlFor="search-input">Search</label>
    <div className="search-input-container">
      <input
        id="search-input"
        type="text"
        placeholder="Enter search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <FaSearch className="search-icon" onClick={handleSearchSubmit} />
    </div>
  </div>
  <div>
    <button className="cart-button" onClick={()=> setIsCartOpen(true)}>
      <FaShoppingCart />
      <span className="cart-text">Cart</span>
    </button>
    <Cart
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
  </div>
</div>
  );
};

export default Navbar;