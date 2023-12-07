'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ActivateAccount = () => {
  const router = useRouter();

  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    const token = pathArray[pathArray.length - 1];

    if (token) {
      activateAccount(token);
    }
  }, []);

  const activateAccount = async (token) => {
    try {
      const response = await fetch(`http://localhost:3001/activateAccount/${token}`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error al activar la cuenta:', response.status);
      }
    } catch (error) {
      console.error('Error al activar la cuenta:', error);
    }
  };

  const redirectToLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <p>Cuenta activada. Por favor, inicia sesión.</p>
      <button onClick={redirectToLogin}>Ir a Iniciar Sesión</button>
    </div>
  );
};

export default ActivateAccount;