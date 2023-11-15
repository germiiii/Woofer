"use client"
import { createContext, useState } from 'react';

const defaultState = {
  open: false,
  status: null,
  msj: null,
};

export const NotificationContext = createContext({} );

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(defaultState);

  const showNotification = (props) => {
    if (props) {
      setNotification(props);

      setTimeout(() => {
        setNotification({ open: false, msj: null, status: null });
      }, 3000);
    }
  };

  return (
    <NotificationContext.Provider value={{ ...notification, showNotification }}>
      {children}
      {notification.open}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
