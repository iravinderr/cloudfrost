import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../../services/apis';
import useAuthNavigation from '../../hooks/AuthNavigation';
import toast from 'react-hot-toast';

export default function LogoutButton() {
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
        toast.success(response.data.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
