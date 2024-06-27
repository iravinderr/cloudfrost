import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../context/AuthContext";
import DeleteAccount from "./DeleteAccount";
import ConfirmDeletion from "./ConfirmDeletion";
import StorageInfo from "./StorageInfo";

function Header() {
  const [showConfirmDeletion, setShowCofirmDeletion] = useState(false);
  const { authenticated } = useAuth();

  const navItems = [
    {
      name: "Login",
      path: "/login",
      active: !authenticated
    },
    {
      name: "Register",
      path: "/register",
      active: !authenticated
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      active: authenticated
    },
    {
      name: "Profile",
      path: "/profile",
      active: authenticated
    }
  ];
  
  return (
    <header className="sticky top-0">
      <nav className="h-16 w-screen p-2 flex justify-evenly Header bg-RaisinBlack gap-2">
        <div className="w-1/2 flex justify-center items-center  ">
          <Link to="/">Cloudfrost</Link>
        </div>
        <ul className="w-1/2 flex justify-evenly items-center">
          {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ) : null
          )}
          {authenticated && (
            <li>
              <LogoutButton />
            </li>
          )}
          {authenticated && (
            <li>
              {!showConfirmDeletion ? <DeleteAccount setShowCofirmDeletion={setShowCofirmDeletion} /> : <ConfirmDeletion />}
            </li>
          )}
          {authenticated && (
            <li>
              <StorageInfo />
            </li>
          )}
        </ul>
        
      </nav>
    </header>
  );
}

export default Header;
