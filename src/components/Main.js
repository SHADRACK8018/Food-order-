import React, { useEffect, useState } from 'react';
import './styles/Main.css';
import MenuCard from './MenuCard';
import Navbar from './Navbar'
import Footer from './Footer';

const Main = () => {
  const [menuItem, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/food/")
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.map(row => ({
          id: row[0],
          name: row[1],
          description: row[2],
          price: parseFloat(row[3]),
          image_url: row[4],
        }));
  
        console.log("Transformed Data:", transformed);
        setMenuItems(transformed);
        setLoading(false);
      })
      .catch(err => console.error('Fetch error:', err));
      setLoading(false);
  }, []);
  

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/food")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenuItems(data);
  //       setLoading(false);
  //       console.log("Items Initialized:", data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching posts:', error);
  //       setLoading(false);
  //     });
  // }, []);

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
      <Footer />
    </div>
  );
}

export default Main;