"use client";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalkerTypeCards from './WalkerTypeCards';

const WalkerHome = () => {
  const [duracionPaseos, setDuracionPaseos] = useState([]);
  const [otrosDetalles, setOtrosDetalles] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [contratacionCliente, setContratacionCliente] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (contratacionCliente) {
      toast.success(`¡${contratacionCliente} ha contratado tu servicio!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setContratacionCliente('');
    }

    setDuracionPaseos([]);
    setOtrosDetalles('');
  };

  const prueba = () => {
    toast.success(`¡${contratacionCliente} ha contratado tu servicio!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    setContratacionCliente('');
  };

  const handleDuracionChange = (id) => {
    const index = duracionPaseos.indexOf(id);
    if (index === -1) {
      setDuracionPaseos([...duracionPaseos, id]);
    } else {
      setDuracionPaseos(duracionPaseos.filter((item) => item !== id));
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

  return (
    <div>
      <ToastContainer />
      <button onClick={prueba}>Contratar Servicio</button>
      <h2>Ofrecer Paseos de Perros</h2>
      <WalkerTypeCards />
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
    </div>
  );
};

export default WalkerHome;
