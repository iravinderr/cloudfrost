import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Navbar({ loggedIn, setLoggedIn }) {
  return (
    <div className="h-16 w-screen p-2 flex justify-evenly navbar bg-RaisinBlack gap-2">
      <div className="w-1/3 flex justify-center items-center  ">
        <Link to="/">MyCloud</Link>
      </div>
      <div className="w-1/3 flex justify-center items-center">
        {!loggedIn && <Link to="/login">Login</Link>}
        {!loggedIn && <Link to="/register">Register</Link>}
        {loggedIn && <Link to="/dashboard">Dashboard</Link>}
        {loggedIn && <Link to="/profile">Profile</Link>}
      </div>
      <div className="w-1/3 flex justify-center items-center">
        {loggedIn && <LogoutButton setLoggedIn={setLoggedIn} />}
      </div>
    </div>
  );
}

export default Navbar;
