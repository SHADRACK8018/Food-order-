import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Homepage.css';
import Login from './Login'
// import { useNavigate } from 'react-router-dom'


const Homepage = ({ showForm, setShowForm, registeredUser, setRegisteredUser }) => {

  // const navigate = useNavigate();

  const submitAddress = () => {

  const address = document.getElementById("addressInput").value ;



    if (address.trim() === "") {

      alert("Please enter a delivery address.");
    } else {
      alert("Order placed! Delivering to: " + address );
    }

  };

  // const handeClick = () => {
  //   navigate('/login')
  // }


  // const showLoginForm = () => {

  //   setShowForm("login");
  // };

  
  // const showSignUpForm = () => {
  //   setShowForm("signup") ;

  // };
  // const closeForm = () =>  {
  //   setShowForm(null) ;
  // }; 

  return (
    <div className="home">
      <div>
        <div className="header">
          <div className="header-title">BiteGo</div>
          <div className="auth-buttons">
          <Link to="http://localhost:5000/login">
  <button>Login</button>
</Link>
<button onClick={() => window.location.href = 'http://localhost:5000/register'}>Sign Up</button>


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
    </div>

  );

};

export default Homepage ;
