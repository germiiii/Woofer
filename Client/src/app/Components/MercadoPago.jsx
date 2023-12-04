import { useEffect, useState } from "react";
import { formatNumber } from "../../utils/FormatNumbers";
import Walktypes from "../PriceList/PriceList";
import Image from "next/image";
import UserDetail from "../Components/UserDetail";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "axios";
import styles from "../Styles/Checkout.module.css";

const MercadoPago = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  // Initializing Mercado Pago
  initMercadoPago('TEST-72bd78b4-271d-44aa-89f0-2a683e4dd83b');

  // const createPreference = async (walkId) => {
  //   try {
  //     const walk = Walktypes.find((item) => item.id === walkId);
  //     const response = await axios.post("http://localhost:3001/create_preference", {
  //       title: walk.title,
  //       description: walk.description.join("\n"),
  //       price: walk.price,
  //       currency_id: walk.currency_id,
  //     });
  //     const { id } = response.data;
  //     console.log({ id });
  //     setPreferenceId(id); // Set the preference ID directly
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const walk = Walktypes[0];
  //   createPreference(walk.id);
  // }, []); 

 
  const walk = Walktypes[0];

  return (
    <div className={styles.container}>
      <div className={styles.productContainer}>
        <UserDetail />
        <div className={styles.data}>
          <div key={walk.id} className={styles.walkItem}>
            <div className={styles.top}>
              <h2>{walk.title}</h2>
              <h3>{formatNumber(walk.price)}</h3>
            </div>
            <div className={styles.center}>
              <span>About this service:</span>
              <ul>
                {walk.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div id="wallet_container">
                <Wallet initialization={{ preferenceId }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MercadoPago;
