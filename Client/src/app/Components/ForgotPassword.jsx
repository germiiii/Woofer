"use client";
import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {

  const api = process.env.NEXT_PUBLIC_APIURL

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Recuperar cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Dirección de correo electrónico:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Enviar Formulario</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
