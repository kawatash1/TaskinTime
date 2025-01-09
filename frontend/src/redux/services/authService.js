import axios from 'axios';

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL

// Функция для входа
export const loginUser = async (email, password, backendUrl) => {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password }); // Отправляем email и password как объект
    console.log('Raw response:', response); // Логируем полный ответ
    console.log('Response data:', response.data); // Логируем только данные
    return response.data; // Возвращаем данные (например, токены)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка при входе');
  }
};