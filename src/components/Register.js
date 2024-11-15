import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://localhost:7257/api/auth/register', {
        username,
        email,
        password,
        role
      });
      alert('Registration successful. Please login.');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-start align-items-start min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
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
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
          <div className="mb-3">
            <select
              className="form-select"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="User">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <div className='my-3'>
                <p>Already have account? <a href='/login'>Login to your account</a></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
