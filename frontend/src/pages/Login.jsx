import React, { useState } from "react";
import axios from "axios";
import { loginAPI } from "../services/apis";
import toast from "react-hot-toast";
import useAuthNavigation from "../hooks/AuthNavigation";
import { Loader } from "../components";

function Login() {
  const { setAuthenticated } = useAuthNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        loginAPI,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setLoading(false);
        setAuthenticated(true);
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide Passowrd" : "Show Password"}
        </button>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
