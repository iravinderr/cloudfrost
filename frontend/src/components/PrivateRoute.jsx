import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" />;
}

export default PrivateRoute;
