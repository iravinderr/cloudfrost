import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  sendRegistrationOtpAPI,
  confirmRegistrationAPI,
} from "../services/apis";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(sendRegistrationOtpAPI, {
        fullName,
        email,
        password,
      });

      if (response.data.success) {
        setIsOtpSent(true);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(confirmRegistrationAPI, {
        email,
        otp,
        fullName,
        password,
      });
      if (response.data.success) {
        navigate("/login");
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="register">
      {!isOtpSent ? (
        <form onSubmit={handleSendOtp}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit">Confirm Registeration</button>
        </form>
      )}
    </div>
  );
}

export default Register;
