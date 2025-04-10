import React, { createContext, useState } from "react";
// import menu from "../../public/db.json"

export const CartContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < item.length + 1; i++){
        cart[i] = 0;
    }
    return cart;
}

export const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const addtoCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
    }

    const removefromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
    }

    const contextValue = {cartItems, addtoCart, removefromCart};

    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>
}
