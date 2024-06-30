import React, { useState } from "react";
import { loginAPI } from "../services/apis";
import toast from "react-hot-toast";
import useAuthNavigation from "../hooks/AuthNavigation";
import { BlueButton, Input, Loader } from "../components";
import { postRequestAxios } from "../services/requests";

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
      const reqBody = { email, password };
      const contentType = "multipart/form-data";

      const response = await postRequestAxios(loginAPI, reqBody, null, null, contentType);

      if (response.data.success) {
        setLoading(false);
        setAuthenticated(true);
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
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
      <form>
        <Input type={"email"} placeholder={"Email"} value={email} setValue={setEmail} />
        
        <Input type={"password"} value={password} setValue={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"Password"} />

        <BlueButton onClick={handleLogin}>Login</BlueButton>
      </form>
    </div>
  );
}

export default Login;
