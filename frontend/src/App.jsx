import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Home, Login, Profile, Register } from "./pages";
import { Navbar, PrivateRoute } from "./components";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/:parentFolderId?" element={ <PrivateRoute><Dashboard /> </PrivateRoute> } />
            <Route path="/profile" element={ <PrivateRoute><Profile /></PrivateRoute> } />
          </Routes>
        </AuthProvider>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
