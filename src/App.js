import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Main from './components/Main'; 
import Cart from './components/Cart';
import Help from './components/Help';
import Login from './components/Login';
import Signup from './components/SignUp';
import Checkout from './components/Checkout';
import { CartContext, CartContextProvider } from './components/CartContext';




function App() {
  const [showForm, setShowForm] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null); 

  return (
    <CartContextProvider>
    <Router>
    <Routes>
  <Route
    path="/"
    element={
      <Homepage/>
    }
  />
  <Route path="/login" element={<Login setRegisteredUser={setRegisteredUser} />} />
  <Route path="/signup" element={<Signup setRegisteredUser={setRegisteredUser} />} />
  <Route path="/landing" element={<Main />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/help" element={<Help />} />
  <Route path="/checkout" element={<Checkout />} />
</Routes>

    </Router>
    </CartContextProvider>
  );
}

export default App;
