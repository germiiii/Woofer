"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalkerTypeCards from './WalkerTypeCards';

const WalkerHome = () => {
  const [otrosDetalles, setOtrosDetalles] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [contratacionCliente, setContratacionCliente] = useState([]);

  useEffect(() => {
    }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (contratacionCliente.length > 0) {
      toast.success(`¡${contratacionCliente.join(', ')} han contratado tu servicio!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setContratacionCliente([]);
    }
  };

  const handleDuracionChange = (id) => {
    const index = contratacionCliente.indexOf(id);
    if (index === -1) {
      setContratacionCliente([...contratacionCliente, id]);
    } else {
      setContratacionCliente(contratacionCliente.filter((item) => item !== id));
    }
  };

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
          contrataciones: contratacionCliente,
        });

        toast.success('¡Estado actualizado correctamente!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.warning('Debes realizar al menos una selección antes de actualizar el estado.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      toast.error('Ocurrió un error al intentar actualizar el estado.', {
        position: toast.POSITION.TOP_RIGHT,
      });
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
      <h2>Ofrecer Paseos de Perros</h2>
      <WalkerTypeCards handleDuracionChange={handleDuracionChange} />
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
