import axios from 'axios';

// Функция для входа
export const loginUser = async (email, password, baseUrl) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/login`, { email, password }); // Отправляем email и password как объект
    return response.data; // Возвращаем данные (например, токены)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка при входе');
  }
};