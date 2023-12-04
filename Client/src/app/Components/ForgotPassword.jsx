"use client";
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Cambia la ruta de la solicitud a http://localhost:3001/changePassword
      const response = await fetch('http://localhost:3001/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
