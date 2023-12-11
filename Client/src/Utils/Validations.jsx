

// Función para validar la contraseña
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Función para validar el correo electrónico
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Función para validar la extensión del archivo (imagen)
  export const validateImageFile = (fileName) => {
    const allowedExtensions = /\.(jpg|png)$/i;
    return allowedExtensions.test(fileName);
  };
  
  // Función para validar una dirección
  export const validateAddress = (address) => {
    const addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
    return address.trim() !== '';
  };

  export const validateToken = () => {
    const storedToken = localStorage.getItem('token');
      // Verificar si el token existe, no estoy viendo si el token es válido
    return !!storedToken;
  };
  