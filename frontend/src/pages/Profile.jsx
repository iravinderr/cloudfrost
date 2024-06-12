import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { verifyTokenAPI } from '../services/apis';

function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(verifyTokenAPI, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><strong>Full Name:</strong> {profile.fullName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
}

export default Profile;
