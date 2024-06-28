import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRegistrationOtpAPI, confirmRegistrationAPI } from "../services/apis";
import toast from "react-hot-toast";
import { BlueButton, Input, Loader } from "../components";
import { postRequestAxios } from "../services/requests";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisiblity = () => setShowPassword(!showPassword);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reqBody = { fullName, email, password };
      const contentType = "multipart/form-data";

      const response = await postRequestAxios(sendRegistrationOtpAPI, reqBody, null, null, contentType);

      if (response.data.success) {
        setIsOTPSent(true);
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reqBody = { email, OTP, fullName, password };
      const contentType = "multipart/form-data";

      const response = await postRequestAxios(confirmRegistrationAPI, reqBody, null, null, contentType);

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="w-screen h-screen p-8">
      {!isOTPSent ? (
        <form>
          <Input type={"text"} placeholder={"Full Name"} value={fullName} setValue={setFullName} />

          <Input type={"email"} placeholder={"Email"} value={email} setValue={setEmail} />

          <Input type={showPassword ? "text" : "password"} placeholder={"Password"} value={password} setValue={setPassword} />

          <BlueButton onClick={togglePasswordVisiblity}>{showPassword ? "Hide Passowrd" : "Show Password"}</BlueButton>

          <BlueButton onClick={handleSendOTP} >Register</BlueButton>
        </form>
      ) : (
        <form>
          <Input type={"text"} placeholder={"OTP"} value={OTP} setValue={setOTP} />

          <BlueButton onClick={handleRegister} >Confirm Registeration</BlueButton>
        </form>
      )}
    </div>
  );
}

export default Register;
