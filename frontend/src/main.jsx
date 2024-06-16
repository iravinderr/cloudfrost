import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PrivateRoute } from "./components";
import { Dashboard, Home, Login, Profile, Register } from "./pages";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={ <App /> } >
            <Route path="" element={ <Home /> } />
            <Route path="login" element={ <Login /> } />
            <Route path="register" element={ <Register /> } />
            <Route path="dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
            <Route path="profile" element={ <PrivateRoute><Profile /></PrivateRoute> } />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider> */}
        <App />
    </React.StrictMode>
  )
