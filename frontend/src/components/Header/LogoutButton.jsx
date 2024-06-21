import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../../services/apis';
import { useAuth } from '../../context/AuthContext';

function LogoutButton() {
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(logoutAPI, null, {
        withCredentials: true
      });
      if (response.data.success) {
        setAuthenticated(false);
        navigate('/');
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
