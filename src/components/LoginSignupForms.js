import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginSignupForms.css' ;


const LoginSignupForms = ({ showForm, closeForm, setShowForm, registeredUser, setRegisteredUser }) =>  {
    const navigate = useNavigate();
  return (
    <>

      {showForm === "login" &&  ( 

        <div className="form-popup">
          <div className="form-box" >
            <span className="close"  onClick={closeForm} >

            ×
            </span >
            <h2>Login</h2 >

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button
                onClick={() => {
                    const email = document.querySelector(".form-box input[type='email']").value;
                    const password = document.querySelector(".form-box input[type='password']").value;

                    if (!email || !password) {
                    alert("Please fill in all fields.");
                    return;
                    }

                    if (
                    registeredUser &&
                    email === registeredUser.email &&
                    password === registeredUser.password
                    ) {
                    alert("Login successful!");
                    navigate("/landing");
                    } else {
                    alert("Incorrect email or password.");
                    }
                }}
                >
                Login
            </button>


          </div>
        </div>

      )}

    {showForm === "signup" && (
        <div className="form-popup">
            <div className="form-box">

            <span className="close" onClick={closeForm}>×</span>
            <h2>Sign Up</h2 >

            <input id="signup-name" type="text" placeholder="Name" />
            <input id="signup-email" type="email" placeholder="Email" />
            <input id="signup-password" type="password" placeholder="Password" />

            <button
                onClick={() =>  {
                const name = document.getElementById("signup-name").value;
                const email = document.getElementById("signup-email").value;
                const password = document.getElementById("signup-password").value;

                if (name && email && password) {
                    setRegisteredUser({ name, email, password }) ;
                    alert("Registration successful! Please log in.");
                    setShowForm("login") ;

                } else {
                    alert("Please fill in all fields.");
                }
                } }
            >
                Register
            </button>

            </div>

        </div>
    ) }


    </>
  ) ;
};

export default  LoginSignupForms; 

