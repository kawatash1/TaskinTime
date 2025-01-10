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
const allowedOrigins = [
  'http://localhost:5173',               
  'https://taskintimee.netlify.app',
  'https://taskintimeee.netlify.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Проверяем, входит ли origin в список разрешённых
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Дополнительная настройка для обработки preflight запросов (OPTIONS)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin); // Разрешаем только для указанных Origin
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
  if (req.method === 'POST') {
    console.log(res.sendStatus(200)); // Убедитесь, что preflight запрос завершается успешно
  }
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

app.post('/test', (req, res) => {
  res.status(200).json({ message: 'Тестовый ответ' });
});


// Запуск сервера
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);