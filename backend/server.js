import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173',  // URL вашего клиента
  credentials: true
}));

// Дополнительная настройка для обработки preflight запросов (OPTIONS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');  // Разрешаем только с этого клиента
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token'); // Заголовки, которые разрешены
  next();
});

// Middleware для обработки JSON
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Логирование подключения к базе данных
mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${mongoose.connection.name}`);
});


// Подключение маршрутов
app.use('/api/tasks', taskRoutes); // Маршруты для задач
app.use('/api/auth', authRoutes); // Маршруты для аутентификации
app.use('/api/user', userRoutes); // Маршруты для пользователя

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Запуск сервера
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);