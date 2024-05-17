import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        username,
        email,
        password,
        password_confirmation: passwordConfirmation
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || ['An error occurred']);
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Crea tu cuenta</h2>
      {errors.length > 0 ? (
        <div className="alert alert-danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Confirmar Contraseña</label>
          <input
            type="password"
            name="password_confirmation"
            className="form-control"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear cuenta</button>
        <p><a href="/login">Volver</a></p>
      </form>
    </div>
  );
};

export default Register;
