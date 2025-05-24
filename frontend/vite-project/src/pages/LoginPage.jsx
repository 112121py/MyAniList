import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      navigate('/dashboard'); // 登入成功後導向動畫列表
    } catch (err) {
      setError(err.response?.data?.error || '登入失敗');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>登入</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>帳號：</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>密碼：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">登入</button>
      </form>
    </div>
  );
};

export default LoginPage;
