import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { verifyTokenAPI } from '../services/apis';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await axios.post(verifyTokenAPI, {}, {
        withCredentials: true,
      });
      return response.data.success;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const tokenValid = await verifyToken();
      setIsLoggedIn(tokenValid);
      setIsLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
