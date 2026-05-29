import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { loginUser } from '../services/UserService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      const data = res.data;

      console.log('Login successful:', data);

      const token = data?.token;
      const firstName = data?.user?.firstName;
      const type = (data?.user?.type || '').toLowerCase().trim();

      // ❗ extra safety check (helps debugging 401/undefined issues)
      if (!token || !firstName || !type) {
        throw new Error('Invalid login response from server');
      }
      localStorage.setItem('token', token);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('type', type);

      // 🚀 navigate
      navigate('/dashboard', {
        state: {
          firstName,
          type,
        },
      });

    } catch (err) {
      console.error(
        'Login failed:',
        err.response?.data?.message || err.message
      );

      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit">Login</Button>
      </form>

      <Link to="/register">
        If you do not have an account, register here.
      </Link>
    </div>
  );
}

export default LoginPage;