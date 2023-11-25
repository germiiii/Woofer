"use client";

import { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import axios from "axios";
import { useRouter } from 'next/navigation';

const AditionalForm = () => {
  const router = useRouter()
  const { userData } = useUser();
  console.log('Datos del usuario:', userData);

  // Estado local para manejar el formulario
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

  // Efecto para actualizar el formulario cuando cambian las props
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

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Puedes enviar formData a tu base de datos u otras acciones
    console.log('Datos del formulario:', formData);
  
    // Realizar la solicitud POST a localhost:3001/register
    try {
      const response = await axios.post('http://localhost:3001/register', formData);
  
      if (response.status === 201) {
        // Mostrar una alerta si la solicitud fue exitosa
        const loginConfirmed = window.confirm('¡Registro exitoso! ¿Quieres iniciar sesión ahora?');
  
        if (loginConfirmed) {
          router.push('/login')
        }
      } else {
        // Mostrar una alerta si la solicitud falla
        alert('Error al registrar. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // Mostrar una alerta si hay un error en la solicitud
      alert('Error al registrar. Inténtalo de nuevo.');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
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