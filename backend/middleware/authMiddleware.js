import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Сохраняем декодированную информацию о пользователе в объекте запроса
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

export default authenticateToken;