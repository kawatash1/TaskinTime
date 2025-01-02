import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Определяем схему пользователя
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, 'Имя пользователя должно быть не менее 3 символов'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Введите правильный адрес электронной почты'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Пароль должен содержать не менее 6 символов'],
  },
  refreshToken: {
    type: String,
    default: null,
  },
}, { timestamps: true }); // timestamps добавляет createdAt и updatedAt

// Хэширование пароля перед сохранением пользователя
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Метод для проверки пароля
userSchema.methods.isPasswordValid = async function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);