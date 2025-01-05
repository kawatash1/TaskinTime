import axios from 'axios';

const backendUrl = "https://taskin-time-backend.onrender.com";

// Функция для входа
export const loginUser = async (email, password, backendUrl) => {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password }); // Отправляем email и password как объект
    return response.data; // Возвращаем данные (например, токены)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка при входе');
  }
};