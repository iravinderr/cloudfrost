import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <LogoutButton />
    </nav>
  );
}

export default Navbar;
