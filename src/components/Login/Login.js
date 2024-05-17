import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      {error ? (
        <div className="alert alert-danger">
          {error}
        </div>
      ): null}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
        <p>
          <a href="/register">Crear cuenta</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
