import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  sendRegistrationOtpAPI,
  confirmRegistrationAPI,
} from "../services/apis";
import toast from "react-hot-toast";
import { Loader } from "../components";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        sendRegistrationOtpAPI,
        {
          fullName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setIsOtpSent(true);
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        confirmRegistrationAPI,
        {
          email,
          otp,
          fullName,
          password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="register">
      {!isOtpSent ? (
        <form onSubmit={handleSendOtp}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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

          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide Passowrd" : "Show Password"}
          </button>

          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit">Confirm Registeration</button>
        </form>
      )}
    </div>
  );
}

export default Register;
