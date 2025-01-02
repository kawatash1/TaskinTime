import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/services/authService.js'; // Убедитесь, что путь правильный

const backendUrl = process.env.REACT_APP_BACKEND_URL;



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');
  try {
    console.log("Logging in with:", email, password); // Логирование данных перед отправкой
    const data = await loginUser(email, password, backendUrl);
    localStorage.setItem('accessToken', data.accessToken);
    alert('You have logged in successfully!');
    navigate('/profile');
  } catch (err) {
    setError(err.message || 'Login error. Please check your details.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className='loginForm'>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          className = "textArea"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className = "textArea"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in!'}
        </button>
      </form>
    </div>
  );
};

export default Login;