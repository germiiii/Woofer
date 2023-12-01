"use client"
import { useEffect, useState } from "react";
import {MercadoPagoButton} from "../Components/MercadoPagoButton";
import { formatNumber } from "../../utils/FormatNumbers";
import Walktypes from "../PriceList/PriceList";
import Image from "next/image";
import UserDetail from "../Components/UserDetail";
import NavBarHome from "../Components/NavBarHome";
import styles from "../Styles/Checkout.module.css"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";

const MercadoPago = () => {
  const [preferenceId, setPreferenceId] = useState(null); //!
  initMercadoPago('TEST-72bd78b4-271d-44aa-89f0-2a683e4dd83b'); //!

  // const [notification, setNotification] = useState({
  //   isOpen: false,
  //   type: null,
  //   content: "",
  // });


  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const status = urlParams.get("status");

  //   if (status === "approved") {
  //     setNotification({
  //       content: "Payment successful!",
  //       isOpen: true,
  //       type: "approved",
  //     });
  //   } else if (status === "failure") {
  //     setNotification({
  //       content: "Payment rejected!",
  //       isOpen: true,
  //       type: "failure",
  //     });
  //   }

  //   setTimeout(() => {
  //     setNotification({
  //       isOpen: false,
  //       type: null,
  //       content: "",
  //     });
  //   }, 5000);
  // }, []);

  //! MercadoPago Video2
  useEffect(() => {
    // Function to create a preference on the server
    const createPreference = async (walkId) => {
      try {
        const walk = Walktypes.find((item) => item.id === walkId);
        const response = await axios.post("http://localhost:3001/create_preference", {
          title: walk.title,
          description: walk.description.join("\n"),
          price: walk.price,
          currency_id: walk.currency_id,
        });
        const { id } = response.data;
        return id;
      } catch (error) {
        console.log(error);
      }
    };

    // Function to handle buying a walk
    const handleBuy = async (walkId) => {
      const id = await createPreference(walkId);
      if (id) {
        setPreferenceId(id);
      }
    };

    // Call handleBuy with the first walk item on component mount (as an example)
    handleBuy(Walktypes[0].id);
  }, []);

//   return (
   
//     <div className={styles.container}>
       
//       <div className={styles.productContainer}>
//         <UserDetail/>

//         <div className={styles.data}>
//           {Walktypes.map((walk) => (
//             <div key={walk.id} className={styles.walkItem}>
//               <div className={styles.top}>
//                 <h2>{walk.title}</h2>
//                 <h3>{formatNumber(walk.price)}</h3>
//               </div>

//               <div className={styles.center}>
//                 <span>About this service:</span>

//                 <ul>
//                   {walk.description.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div>
//         <MercadoPagoButton/> 
//         </div>
       
//       </div>

//       {notification.isOpen && (
//         <div className={styles.notification}>
//           <div
//             className={styles.iconContainer}
//             style={{
//               backgroundColor:
//                 notification.type === "approved" ? "#00cc99" : "#ee4646",
//             }}
//           >
//             <Image
//               src={`/${notification.type}.png`}
//               alt={notification.type}
//               width={25}
//               height={25}
//             />
//           </div>

//           <p>{notification.content}</p>
//         </div>
//       )}
//     </div>
  
//   );

const walk = Walktypes[0]

  return (
    <div className={styles.container}>
      <div className={styles.productContainer}>
        <UserDetail />
        <div className={styles.data}>
          {/* Muestra solo el primer elemento */}
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
           
            <button onClick={() => handleBuy(walk.id)}>Buy {walk.title}</button>
              {preferenceId && <Wallet initialization={{ preferenceId }} />}
           

          </div>
          {/* <div>
          <MercadoPagoButton walk={walk}/>
        </div> */}
        </div>
       
      </div>
      {notification.isOpen && (
        <div className={styles.notification}>
          <div
            className={styles.iconContainer}
            style={{
              backgroundColor:
                notification.type === "approved" ? "#00cc99" : "#ee4646",
            }}
          >
            <Image
              src={`/${notification.type}.png`}
              alt={notification.type}
              width={25}
              height={25}
            />
          </div>
          <p>{notification.content}</p>
        </div>
      )}
    </div>
  );
}

export default MercadoPago