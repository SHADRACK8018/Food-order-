import React, { useState } from 'react';
import './styles/Homepage.css';
import LoginSignupForms from './LoginSignupForms' ;


const Homepage = ({ showForm, setShowForm, registeredUser, setRegisteredUser }) => {


  const submitAddress = () => {

    const address = document.getElementById("addressInput").value ;



    if (address.trim() === "") {

      alert("Please enter a delivery address.");
    } else {
      alert("Order placed! Delivering to: " + address );
    }

  };


  const showLoginForm = () => {

    setShowForm("login");
  };

  
  const showSignUpForm = () => {
    setShowForm("signup") ;

  };
  const closeForm = () =>  {
    setShowForm(null) ;
  }; 

  return (
    
    <div className="home">
      <div>
        <div className="header">
        <div className="header-title">BiteGo</div>
        <div className= "auth-buttons">
          <button onClick={showLoginForm}>Login</button >
          <button onClick={showSignUpForm}>Sign Up</button>
        </div>
        </div>
      </div>

      <h1>Welcome to BiteGo</h1>
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
        alt="Delicious Food "
      />
      
      <div className="overlay" >

        <input
          type="text"
          id="addressInput"
          placeholder="Enter delivery address"

        />

        <button onClick={submitAddress}>Add</button >
      </div>

      <LoginSignupForms  
      showForm={showForm} 
      closeForm={closeForm}  
      setShowForm={setShowForm}
      registeredUser={registeredUser}
      setRegisteredUser={setRegisteredUser}
      />

    </div >
  );

};

export default Homepage ;
