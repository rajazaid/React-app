import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7257/api/auth/login', { username, password });
      const token = response.data.token.result;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="container d-flex justify-content-start align-items-start min-vh-100">
        <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <div className='my-3'>
                <p>Don't you have account? <a href='/register'>Register Here</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
