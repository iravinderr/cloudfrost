import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, Home, Login, Profile, Register } from './pages/pages';
import { Navbar, PrivateRoute } from './components/components';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Router>
        <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute loggedIn={loggedIn}><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute loggedIn={loggedIn}><Profile /></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
