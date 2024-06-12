import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getProfileAPI } from '../services/apis';

function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(getProfileAPI, {
          withCredentials: true
        });

        if (response.data.success) {
          setProfile(response.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p><strong>Full Name:</strong> {profile.fullName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
}

export default Profile;
