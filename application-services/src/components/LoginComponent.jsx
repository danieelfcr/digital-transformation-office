import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';

export const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    //Domain Validation
    if (!email.endsWith('@dto.com')) {
      setError('Email should be a @dto.com domain');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5265/api/auth/login', {
        email,
        password
      });
      sessionStorage.setItem('message', response.data.message);
      sessionStorage.setItem('id', response.data.id)
      navigate('/dashboard');
      // localStorage.setItem('token', response.data.token);
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 500) {
          setError('Server Error. Try Later.');
        } else if (status === 401 || status === 404) {
          setError('Invalid credentials. Please check your email and password.');
        } else {
          setError('An error occured, try again.');
        }
      } else {
        setError('Couldnt connect to server');
      }

      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Log in</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            placeholder='your-email@dto.com'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Ingresar</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

