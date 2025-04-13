import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Main from './components/Main'; 
import Cart from './components/Cart';
import Wallet from './components/Wallet';
import Help from './components/Help';
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
            <Homepage
              showForm={showForm}
              setShowForm={setShowForm}
              setRegisteredUser={setRegisteredUser}
              registeredUser={registeredUser}
            />
          }
        />
        <Route path="/landing" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/help" element={<Help />} />
        <Route path="/wallet" element={<Wallet />} />

      </Routes>
    </Router>
    </CartContextProvider>
  );
}

export default App;
