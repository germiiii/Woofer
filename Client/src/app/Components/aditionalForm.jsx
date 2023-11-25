"use client";

import { useState, useEffect } from 'react';

const AditionalForm = ({name, lastName, email}) => {
  console.log('props:', {name, lastName, email})

  // Estado local para manejar el formulario
  const [formData, setFormData] = useState({
    name: name || '',
    lastName: lastName || '',
    email: email || '',
    address: '',
    username: '',
    isWalker: false,
    image: '',
  });

  // Efecto para actualizar el formulario cuando cambian las props
  useEffect(() => {
    setFormData({
      name: name || '',
      lastName: lastName || '',
      email: email || '',
      address: '',
      username: '',
      isWalker: false,
      image: '',
    });
  }, [name, lastName, email]);

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Puedes enviar formData a tu base de datos u otras acciones
    console.log('Datos del formulario:', formData);
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
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default AditionalForm;