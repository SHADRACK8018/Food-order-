import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Main from './components/Main'; 

function App() {
  const [showForm, setShowForm] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null); 

  return (
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
      </Routes>
    </Router>
  );
}

export default App;
