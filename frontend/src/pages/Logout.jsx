import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;
const apiUrl = `${backendUrl}/api`;
console.log(apiUrl);

const Logout = () => {
  const navigate = useNavigate(); // Для редиректа после выхода

  const handleLogout = async () => {
    try {
      // Отправка POST-запроса на сервер для выхода
      await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });

      // Очистка токенов из localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Перенаправление на главную страницу
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message || error);
    }
  };

  return (
    <div className="logout-container">
      <h2>Are you sure you want to logout?</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;