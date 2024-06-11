import React, { useState } from "react"
import axios from "axios"
import { loginAPI } from "../services/apis";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const response = await axios.post(loginAPI, {email, password});

        if (response.status === 200) {
          console.log(response.data.message);
        }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-full flex justify-center items-center bg-red-300">
      <div className="flex flex-col justify-center items-center bg-slate-400 h-48 w-96">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col">

            {/* <label htmlFor="email">Email:</label> */}
            <input
              className="h-8 w-80 border-2 border-black p-2"
              type="email"
              id="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            {/* <label htmlFor="password">Password:</label> */}
            <input
              className="h-8 w-80 border-2 border-black p-2"
              type="password"
              id="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

          <button 
            className="h-8 w-80 border-2 border-white p-2 flex justify-center items-center bg-ElectricIndigo text-white"
            type="submit"
          >
            Login
          </button>
        </form>
        </div>
    </div>
  );
}

export default Login;
