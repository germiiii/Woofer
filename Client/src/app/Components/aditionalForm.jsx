"use client";

import { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import axios from "axios";
import { useRouter } from 'next/navigation';

const AditionalForm = () => {
  const router = useRouter()
  const { userData } = useUser();

  const [formData, setFormData] = useState({
    name: userData.name || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    address: '',
    username: '',
    password: '',
    isWalker: false,
    image: '',
  });

  useEffect(() => {
    setFormData({
      name: userData.name || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      address: '',
      username: '',
      password: '',
      isWalker: false,
      image: '',
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Datos del formulario:', formData);
  
    try {
      const response = await axios.post('http://localhost:3001/register', formData);
  
      if (response.status === 201) {
        const loginConfirmed = window.confirm('¡Registro exitoso! ¿Quieres iniciar sesión ahora?');
  
        if (loginConfirmed) {
          router.push('/login')
        }
      } else {
        alert('Error al registrar. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al registrar. Inténtalo de nuevo.');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} disabled />
        </label>
        <label>
          Address:
          <input type="text" name="address" onChange={handleChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="username" onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default AditionalForm;