//! OJO - SE EXPORTA PERO NO POR DEFAULT
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Loader from "../Components/Loader";
import axios from "axios";
import styles from "../Styles/MercadoPagoButton.module.css"
import Walktypes from "../PriceList/PriceList";


// En MercadoPagoButton
// En el componente MercadoPagoButton

export const MercadoPagoButton = ({ walk }) => {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const generateLink = async () => {
        setLoading(true);
  
        try {
          // Realizar la solicitud a la API para generar el enlace de pago
          const { data: preference } = await axios.post("/checkout", {
            walk,
          });
  
          // Establecer el enlace obtenido en el estado
          setUrl(preference.url);
        } catch (error) {
          // Manejar los errores de la solicitud a la API
          console.error("Error al obtener el enlace de pago:", error);
        }
  
        setLoading(false);
      };
  
      generateLink();
    }, [walk]);
  
    // Función para redirigir al usuario al enlace de pago
    const redirectToPayment = () => {
      if (!loading && url) {
        window.location.href = url;
      }
    };
  
    return (
      <div>
        {loading ? (
          <button className={styles.button} disabled>
            <Loader />
          </button>
        ) : (
          <button className={styles.button} onClick={redirectToPayment}>
            BUY
          </button>
        )}
      </div>
    );
  };
  