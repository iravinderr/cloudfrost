import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {authenticated} = useAuth();
  
  return (
    <div className="h-16 w-screen p-2 flex justify-evenly navbar bg-RaisinBlack gap-2">
      <div className="w-1/3 flex justify-center items-center  ">
        <Link to="/">MyCloud</Link>
      </div>
      <div className="w-1/3 flex justify-center items-center">
        {!authenticated && <Link to="/login">Login</Link>}
        {!authenticated && <Link to="/register">Register</Link>}
        {authenticated && <Link to="/dashboard">Dashboard</Link>}
        {authenticated && <Link to="/profile">Profile</Link>}
      </div>
      <div className="w-1/3 flex justify-center items-center">
        {authenticated && <LogoutButton />}
      </div>
    </div>
  );
}

export default Navbar;
