import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const getDefaultCart = (items) => {
    let cart = {};
    for (let i = 1; i < items.length + 1; i++){
        cart[i] = 0;
    }
    return cart;
}

export const CartContextProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [favorites, setFavorite] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3001/menu")
            .then((res) => res.json())
            .then((data) => {
                setMenuItems(data);
                setCartItems(getDefaultCart(data));
            })
            .catch(err => console.error('Fetch error:', err))
    }, []);

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
        favorites.some(fav => fav.id === itemId); //.some() returns a boolean value true or false when checking if an item is favorite or not
    }

    const contextValue = {cartItems, addtoCart, removefromCart, favorites, toggleFavorite, isFavorite};

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}
