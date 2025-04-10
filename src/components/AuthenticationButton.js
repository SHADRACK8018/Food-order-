import React from 'react';
import './styles/LoginSignupForms.css' ;


const AuthenticationButton= ({ showForm }) => {

  return (
    <div className ="auth-buttons">
      < button onClick= {() => showForm('login')}>Login</button>

      <button onClick={() =>  showForm('signup')}>Sign Up</button>

    </div >
  );

} ;

export default AuthenticationButton ;
