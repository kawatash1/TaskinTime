import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiUrl = `${backendUrl}/api`;


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('User is not logged in.');

        // Исправленный URL для получения профиля
        const response = await axios.get(`${apiUrl}/user/profile`, {
          headers: { 'x-auth-token': token }, 
        });

        setUser(response.data);
      } catch (err) {
        // setError(err.message || 'Failed to load profile.');
        setError('Failed to load profile. Please login')

        // return (
        //   <h1>Please login at first</h1>
        // )

      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="content">
    <div id="Profile">
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : user ? (
        <>
          <h1>Your Profile</h1>
          <img
            src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
            alt="Avatar"
            style={{ width: '100px', height: '100px' }}
          />
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default ProfilePage;