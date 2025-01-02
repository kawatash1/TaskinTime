import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import User from '../models/User.js';

// Валидационные схемы
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Регистрация пользователя
export const registerUser = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует.' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Пользователь зарегистрирован успешно!' });
  } catch (error) {
    next(error);
  }
};

// Вход пользователя
export const loginUser = async (req, res, next) => {
  console.log("Received login data:", req.body); // Логирование тела запроса

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Неверный пароль.' });
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      accessToken,
      refreshToken,
      message: 'Успешный вход в систему!',
    });
  } catch (error) {
    next(error);
  }
};

// Выход пользователя
export const logoutUser = async (req, res, next) => {
  const { refreshToken } = req.body;
  const token = refreshToken || req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token отсутствует.' });
  }

  try {
    const user = await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }

    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Вы успешно вышли из системы.' });
  } catch (error) {
    next(error);
  }
};

// Обновление токена
export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token отсутствует.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Неверный refresh token.' });
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};