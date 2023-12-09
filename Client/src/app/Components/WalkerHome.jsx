"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DogWalkOption from "../Components/DogWalkOption";
import "tailwindcss/tailwind.css";
import Map from "../Components/Map";
import jwt from 'jsonwebtoken';

const WalkerHome = () => {
  const [comentarios, setComentarios] = useState([]);
  const [contratacionCliente, setContratacionCliente] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [user, setUser] = useState("");
  const [dogCapacityFilter, setDogCapacityFilter] = useState('');
  const [walkDurationFilter, setWalkDurationFilter] = useState('');
  const [optionChosen, setOptionChosen] = useState([]);
  const [userProvince, setUserProvince] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwt.decode(token);
        console.log(decodedToken.userId);
        try {
          const response = await fetch(`http://localhost:3001/users/${decodedToken.userId}`);
          const data = await response.json();
          setUser(data);
          setUserProvince(data.province);
          setUserAddress(data.address);
        } catch (error) {
          console.error('Error al obtener datos del servidor', error);
        }
      }
    };
    obtenerDatos();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/walkType`);
        const data = await response.json();
        setPriceList(data.walkTypeData);
      } catch (error) {
        console.error("Error fetching walker types:", error);
      }
    };
    fetchData();
  }, []);


  const handleDogCapacityFilterChange = (event) => {
    setDogCapacityFilter(event.target.value);
  };

  const handleWalkDurationFilterChange = (event) => {
    setWalkDurationFilter(event.target.value);
  };

  const handleOptionClick = (card) => {
    const updatedOptions = [...optionChosen];

      const index = updatedOptions.findIndex((selectedCard) => selectedCard.id === card.id);
    if (index !== -1) {
      updatedOptions.splice(index, 1);
    } else {
      updatedOptions.push(card);
    }
    setOptionChosen(updatedOptions);
  };

  const renderList = priceList
    .filter((card) => {
      const dogCapacityFilterCondition =
        !dogCapacityFilter ||
        (dogCapacityFilter === "low" && card.dog_capacity === "low") ||
        (dogCapacityFilter === "medium" && card.dog_capacity === "medium") ||
        (dogCapacityFilter === "high" && card.dog_capacity === "high");

      const walkDurationFilterCondition =
        !walkDurationFilter ||
        (walkDurationFilter === "15" && card.walk_duration.includes("15")) ||
        (walkDurationFilter === "30" && card.walk_duration.includes("30")) ||
        (walkDurationFilter === "60" && card.walk_duration.includes("60"));

      return dogCapacityFilterCondition && walkDurationFilterCondition;
    })
    .map((card) => (
      <DogWalkOption
        key={card.id}
        option={card}
        onClick={() => handleOptionClick(card)}
        selected={optionChosen.some((selectedCard) => selectedCard.id === card.id)}
      />
    ));

  const handleResponderComentario = (index, respuesta) => {
    const updatedComentarios = [...comentarios];
    updatedComentarios[index].respuesta = respuesta;
    setComentarios(updatedComentarios);
  };

  const handleActivoClick = async () => {
    try {
      if (user.id) {
        await axios.put(`http://localhost:3001/walker/${user.id}`, {
          is_available: true,
        });
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  const handleElegirOpciones = async () => {
    try {
      const response = await axios.put('http://tu-url', optionChosen);
      console.log('Respuesta de la solicitud PUT:', response.data);
    } catch (error) {
      console.error('Error al realizar la solicitud PUT:', error);
    }
  };
  const prueba = () => {
    toast.success(`¡${contratacionCliente.join(', ')} han contratado tu servicio! (Prueba)`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };


  console.log("optionChosen", optionChosen);

  return (
    <div className="text-center m-20">
      <ToastContainer />
      <Map userProvince={userProvince} userAddress={userAddress} />

      <button onClick={prueba} className="bg-black text-white px-4 py-2">
        Prueba para cuando llegue una solicitud de paseo
      </button>
      <br />
      <select
        value={walkDurationFilter}
        onChange={handleWalkDurationFilterChange}
        className="border p-2 rounded mr-2"
      >
        <option value="">Filtrar por Tiempo</option>
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">60 minutes</option>
      </select>
      <br />
      {walkDurationFilter && (
        <select
          value={dogCapacityFilter}
          onChange={handleDogCapacityFilterChange}
          className="border p-2 rounded mr-2"
        >
          <option value="">Filtrar por capacidad de perros</option>
          <option value="low">1</option>
          <option value="medium">2</option>
          <option value="medium">3</option>
          <option value="medium">4</option>
          <option value="high">5</option>
          <option value="high">6 or more</option>
        </select>
      )}
      <div>{renderList}</div>
      <div>
  <h2>Opciones Seleccionadas</h2>
  {optionChosen.length > 0 ? (
    <ul>
      {optionChosen.map((selectedOption) => (
        <li key={selectedOption.id}>
          {selectedOption.title} - {selectedOption.walk_duration} minutes
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay opciones seleccionadas</p>
  )}
  <button onClick={handleElegirOpciones}>Elegir opciones</button>
</div> 
      <button
        onClick={handleActivoClick}
        disabled={renderList.length === 0}
        className={`bg-black text-white px-4 py-2 ${
          optionChosen && optionChosen.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        >
        Activo
      </button>
        <div>
          <h2>Comentarios de Clientes</h2>
          {comentarios.map((comentario, index) => (
            <div key={index}>
              <p>{comentario.texto}</p>
              {comentario.respuesta && <p>Respuesta: {comentario.respuesta}</p>}
              {!comentario.respuesta && (
                <input
                  type="text"
                  placeholder="Responder..."
                  value={comentario.respuesta || ''}
                  onChange={(e) => handleResponderComentario(index, e.target.value)}
                  className="border p-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
    </div>
  );
};

export default WalkerHome;
