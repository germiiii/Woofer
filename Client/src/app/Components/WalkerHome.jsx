"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DogWalkOption from "../Components/DogWalkOption";
// import jwt from 'jsonwebtoken';
// agregar filtros por dog capacity / precio / tiempo

const WalkerHome = () => {
  const [otrosDetalles, setOtrosDetalles] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [contratacionCliente, setContratacionCliente] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [user, setUser] = useState(null);
  const [dogCapacityFilter, setDogCapacityFilter] = useState('');
  const [walkDurationFilter, setWalkDurationFilter] = useState('');

  
  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if(token){
    //   const decodedToken = jwt.decode(token);
    //   setUser(decodedToken.userId);
    //   console.log("Decode Token", decodedToken)
    //DESCOMENTA TODO ESTO CABEZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    // }
    }, []);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/walkType");
        const data = await response.json();
        setPriceList(data.walkTypeData);
      } catch (error) {
        console.error("Error fetching walker types:", error);
      }
    };
    fetchData();
  }, []); 

    const handleSubmit = (event) => {
    event.preventDefault();
     };

  const handleDogCapacityFilterChange = (event) => {
    setDogCapacityFilter(event.target.value);
  };
  

  const handleWalkDurationFilterChange = (event) => {
    setWalkDurationFilter(event.target.value);
  }

  const filteredCards = priceList.filter((card) => {
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
  
    return (
      dogCapacityFilterCondition &&
      walkDurationFilterCondition
    )
    })

    const renderList = filteredCards.map((card) => {
      return (
        <DogWalkOption
          option={card}
        />
      );
    })
  const handleComentarioSubmit = (event) => {
    event.preventDefault();
    setComentarios([...comentarios, { texto: nuevoComentario, respuesta: '' }]);
    setNuevoComentario('');
  };

  const handleResponderComentario = (index, respuesta) => {
    const updatedComentarios = [...comentarios];
    updatedComentarios[index].respuesta = respuesta;
    setComentarios(updatedComentarios);
  };

  const handleActivoClick = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (contratacionCliente.length > 0) {
        await axios.put(`http://localhost:3001/walker/${userId}`, {
          is_available: true,
        });   
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  const prueba = () => {
    toast.success(`¡${contratacionCliente.join(', ')} han contratado tu servicio! (Prueba)`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    setContratacionCliente([]);
  };

  return (
    <div>
      <ToastContainer />
      <button onClick={prueba}>Contratar Servicio</button>
      <select
      value={walkDurationFilter} 
      onChange={handleWalkDurationFilterChange}>
        <option value="">Filtrar por Tiempo</option>
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">60</option>
      </select>
      <select
      value={dogCapacityFilter} 
      onChange={handleDogCapacityFilterChange}>
        <option value="">Filtrar por capacidad de perros</option>
        <option value="low">1</option>
        <option value="medium">2</option>
        <option value="medium">3</option>
        <option value="medium">4</option>
        <option value="high">5</option>
        <option value="high">6 or more</option>
      </select>
      <div>
        {renderList.length > 0 ? (
          renderList
        ): (
          <p>No hay paseos disponibles</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Otros Detalles</h3>
          <textarea
            value={otrosDetalles}
            onChange={(e) => setOtrosDetalles(e.target.value)}
            placeholder="Información adicional sobre el paseo..."
          />
        </div>
        <button type="submit">Ofrecer Paseo</button>
      </form>

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
              />
            )}
          </div>
        ))}
        <form onSubmit={handleComentarioSubmit}>
          <input
            type="text"
            placeholder="Deja un comentario..."
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
          />
          <button type="submit">Comentar</button>
        </form>
      </div>

      {/* Agrega el botón "Activo" habilitado solo si hay al menos una selección en contratacionCliente */}
      <button
        onClick={handleActivoClick}
        disabled={contratacionCliente.length === 0}
      >
        Activo
      </button>
    </div>
  );
};

export default WalkerHome;
