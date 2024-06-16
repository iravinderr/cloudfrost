import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { refreshTokensAPI, verifyTokenAPI } from '../services/apis';
import { useNavigate } from 'react-router-dom';
import { LineWave, ThreeDots } from "react-loader-spinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await axios.post(verifyTokenAPI, null, {
        withCredentials: true,
      });
      return response.data.success;
    } catch (error) {
      return false;
    }
  };

  const refreshTokens = async () => {
    try {
      const response = await axios.post(refreshTokensAPI, null, {
        withCredentials: true
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        return true;
      } 
    } catch (error) {
      // toast.error(error.response?.data?.message);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const tokenValid = await verifyToken();
      if (tokenValid) {
        setAuthenticated(true);
      } else {
        const tokensRefreshed = await refreshTokens();
        if (tokensRefreshed) {
          setAuthenticated(true);
          navigate('/dashboard'); // Navigate to dashboard after successful refresh
        } else {
          setAuthenticated(false);
        }
      }
      setIsLoading(false);
    })();
  }, [navigate]);

  if (isLoading) {
    return <LineWave />; // Or a spinner component
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
