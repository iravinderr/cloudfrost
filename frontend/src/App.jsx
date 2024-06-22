import React from "react";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-screen overflow-auto">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
