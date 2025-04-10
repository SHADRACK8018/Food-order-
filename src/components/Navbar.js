import React, { useState } from 'react';
import './styles/Navbar.css';
import { FaBars, FaSearch } from 'react-icons/fa';

const Navbar = () => {
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
        <div className="sidebar-content">
          <span className="close-btn" onClick={toggleSidebar}>
            ×
          </span>
          <h2></h2>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </div>
      </div>

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
    </div>
  );
};

export default Navbar;
