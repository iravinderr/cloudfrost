import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, Home, Login, Profile, Register } from './pages/pages';
import { Navbar, PrivateRoute } from './components/components';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className='h-screen w-screen overflow-hidden'>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </Router>
        <Toaster />
    </div>
  );
}

export default App;
