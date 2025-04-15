import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import Cart from './Cart';
import { FaBars, FaSearch, FaShoppingCart, FaHeart, FaWallet, FaQuestionCircle, FaShoppingBag, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle input change in search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit (fetches data from the server)
  const handleSearchSubmit = () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a search query');
      return;
    }

    setLoading(true);  // Start loading indicator
    // Adjusted URL to specifically search by name
    fetch(`http://localhost:5000/api/food?name=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.map((row) => ({
          id: row[0],
          name: row[1],
          description: row[2],
          price: parseFloat(row[3]),
          image_url: row[4],
        }));
        setSearchResults(transformed); // Set search results
        setLoading(false); // Stop loading indicator
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  };

  // Sidebar JSX structure
  const renderSidebar = () => (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Side</h2>
        <span className="close-btn" onClick={toggleSidebar}>✖</span>
      </div>
      <div className="sidebar-body">
        <ul>
          <li><FaUser /> <Link className="menu-item" to="http://localhost:8000/account">Account</Link></li>
          <li><FaShoppingBag /> <Link className="menu-item" to="/orders">Orders</Link></li>
          <li><FaHeart /> <Link className="menu-item" to="/favorites">Favorites</Link></li>
          <li><FaWallet /> <Link className="menu-item" to="/wallet">Wallet</Link></li>
          <li><FaQuestionCircle /> <Link className="menu-item" to="/help">Help</Link></li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <button
          className="signout"
          onClick={() => {
            fetch("http://localhost:5000/logout", { method: 'POST' })
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
  );

  return (
    <div className="navbar">
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>
      
      {renderSidebar()}

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
        <button className="cart-button" onClick={() => setIsCartOpen(true)}>
          <FaShoppingCart />
          <span className="cart-text">Cart</span>
        </button>
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>

      {/* Search Results */}
      <div className="search-results">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {searchResults.length === 0 ? (
              <p>No results found</p>
            ) : (
              searchResults.map((item) => (
                <li key={item.id}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                  <img src={item.image_url} alt={item.name} />
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;