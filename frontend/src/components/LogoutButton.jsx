import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../services/apis';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(logoutAPI, null, {
        withCredentials: true
      });
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
