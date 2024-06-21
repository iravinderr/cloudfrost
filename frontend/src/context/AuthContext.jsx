import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast, { LoaderIcon } from 'react-hot-toast';
import { refreshTokensAPI, verifyTokenAPI } from '../services/apis';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
        return true;
      } 
    } catch (error) {
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
        } else {
          setAuthenticated(false);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <LoaderIcon />
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
