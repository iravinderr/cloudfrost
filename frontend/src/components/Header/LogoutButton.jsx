import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../../services/apis';
import useAuthNavigation from '../../hooks/AuthNavigation';

function LogoutButton() {
  const { setAuthenticated } = useAuthNavigation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(logoutAPI, null, {
        withCredentials: true,
      });
      if (response.data.success) {
        setAuthenticated(false);
        navigate('/');
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
    className='bg-red-500 text-white'
    onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
