import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const getDefaultCart = (items) => {
    let cart = {};
    for (let item of items) {
        if (item?.id !== undefined) {
            cart[item.id] = 0;
        }
    }
    return cart;
}

export const CartContextProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [favorites, setFavorite] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/food")
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
            setCartItems(getDefaultCart(transformed));
          })
          .catch(err => console.error('Fetch error:', err));
      }, []);
      
    
    // useEffect(() => {
    //     fetch("http://localhost:5000/api/food")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("API returned data:", data);
    //             setMenuItems(data);
    //             setCartItems(getDefaultCart(data));
    //             console.log("Cart Items Initialized:", cartItems);
    //         })
    //         .catch(err => console.error('Fetch error:', err))
    // }, []);

    const addtoCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
    }

    const removefromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
    }

    const toggleFavorite = (item) => {
        setFavorite(prev => {
            const exists = prev.find(fav => fav.id === item.id);
            return exists
            ? prev.filter(fav => fav.id !== item.id) : [...prev, item];
        })
    }

    const isFavorite = (itemId) => {
        return favorites.some(fav => fav.id === itemId); //.some() returns a boolean value true or false when checking if an item is favorite or not
    }

    const contextValue = {cartItems, addtoCart, removefromCart, favorites, toggleFavorite, isFavorite, menuItems};

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}
