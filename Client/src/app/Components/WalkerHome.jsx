"use client";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WalkerHome = () => {
  const [duracionPaseos, setDuracionPaseos] = useState([]);
  const [tamanioPerros, setTamanioPerros] = useState([]);
  const [cantidadPerros, setCantidadPerros] = useState(1);
  const [otrosDetalles, setOtrosDetalles] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [contratacionCliente, setContratacionCliente] = useState('');

  const productosServidor = [
    { id: 1, nombre: 'Paseo corto', duracion: 15 },
    { id: 2, nombre: 'Paseo estándar', duracion: 30 },
    { id: 3, nombre: 'Paseo largo', duracion: 60 },
  ];

  const tamaniosPerrosDisponibles = ['Chico', 'Mediano', 'Grande'];

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Duración de paseos:', duracionPaseos);
    console.log('Tamaño de perros:', tamanioPerros);
    console.log('Cantidad de perros:', cantidadPerros);
    console.log('Otros detalles:', otrosDetalles);

    // Lógica para enviar la información al servidor si es necesario.

    // Mostrar notificación de contratación del servicio
    if (contratacionCliente) {
      toast.success(`¡${contratacionCliente} ha contratado tu servicio!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setContratacionCliente('');
    }

    setDuracionPaseos([]);
    setTamanioPerros([]);
    setCantidadPerros(1);
    setOtrosDetalles('');
  };
  const prueba = () => {toast.success(`¡${contratacionCliente} ha contratado tu servicio!`, {
    position: toast.POSITION.TOP_RIGHT,
  });
  setContratacionCliente('');
    
  }
  const handleDuracionChange = (id) => {
    const index = duracionPaseos.indexOf(id);
    if (index === -1) {
      setDuracionPaseos([...duracionPaseos, id]);
    } else {
      setDuracionPaseos(duracionPaseos.filter((item) => item !== id));
    }
  };

  const handleTamanioChange = (tamanio) => {
    if (tamanioPerros.includes(tamanio)) {
      setTamanioPerros(tamanioPerros.filter((item) => item !== tamanio));
    } else {
      setTamanioPerros([...tamanioPerros, tamanio]);
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
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Opciones de Paseo</h3>
          {productosServidor.map((producto) => (
            <div key={producto.id}>
              <input
                type="checkbox"
                id={`paseo-${producto.id}`}
                checked={duracionPaseos.includes(producto.id)}
                onChange={() => handleDuracionChange(producto.id)}
              />
              <label htmlFor={`paseo-${producto.id}`}>
                {producto.nombre} ({producto.duracion} min)
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3>Tamaño de Perros</h3>
          {tamaniosPerrosDisponibles.map((tamanio) => (
            <div key={tamanio}>
              <input
                type="checkbox"
                id={`tamanio-${tamanio}`}
                checked={tamanioPerros.includes(tamanio)}
                onChange={() => handleTamanioChange(tamanio)}
              />
              <label htmlFor={`tamanio-${tamanio}`}>{tamanio}</label>
            </div>
          ))}
        </div>
        <div>
          <h3>Cantidad de Perros</h3>
          <input
            type="number"
            min="1"
            value={cantidadPerros}
            onChange={(e) => setCantidadPerros(e.target.value)}
          />
        </div>
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
