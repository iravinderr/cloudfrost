import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../services/apis';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(logoutAPI, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
