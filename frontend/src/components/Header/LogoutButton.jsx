import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../../services/apis';
import useAuthNavigation from '../../hooks/AuthNavigation';
import toast from 'react-hot-toast';
import Loader from '../Loader';

function LogoutButton() {
  const { setAuthenticated } = useAuthNavigation();
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(logoutAPI, null, {
        withCredentials: true,
      });
      if (response.data.success) {
        setLoading(false);
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

  if (loading) {
    return <Loader />
  }

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
