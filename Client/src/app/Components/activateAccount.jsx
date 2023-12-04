'use client';

import React from 'react';
import Link from 'next/link';

const ActivationConfirmation = () => {
  return (
    <div>
      <h2>Felicidades, has activado tu cuenta</h2>
      <p>Por favor, inicia sesión para comenzar</p>
      <Link href="/login">
        <button>Iniciar Sesión</button>
      </Link>
    </div>
  );
};

export default ActivationConfirmation;