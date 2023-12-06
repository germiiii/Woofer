'use client';
import { useEffect } from "react";
import { useState } from "react";

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // token desde la URL
    const pathArray = window.location.pathname.split('/');
    const tokenFromUrl = pathArray[pathArray.length - 1];
    setToken(tokenFromUrl);
  }, []);

  const handleChangePassword = async () => {
    try {
      if (!token || !password) {
        console.error('Token o nueva contraseña están vacíos');
        return;
      }

      // solicitud al servidor para cambiar la contraseña aquí
      const response = await fetch(`http://localhost:3001/changePassword/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error al cambiar la contraseña:', response.status);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };

  return (
    <div>
      <h2>Cambio de Contraseña</h2>

      <form onSubmit={handleChangePassword}>
        <label htmlFor="newPassword">Nueva Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ChangePassword;