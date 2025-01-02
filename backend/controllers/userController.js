import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Получение профиля пользователя
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('username email');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// Обновление профиля пользователя
export const updateUserProfile = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({ message: 'Профиль обновлён успешно!' });
  } catch (error) {
    next(error);
  }
};

// Удаление пользователя
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }

    res.status(200).json({ message: 'Пользователь удалён успешно!' });
  } catch (error) {
    next(error);
  }
};

// Отладка пользователей
export const debugUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
