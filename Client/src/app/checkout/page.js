"use client"
import { useEffect, useState } from "react";
//import { MercadoPagoButton } from "@/components/MercadoPagoButton";
import { formatNumber } from "../../utils/FormatNumbers";
import Walktypes from "../PriceList/PriceList";
import Image from "next/image";
import UserDetail from "../Components/UserDetail";
import NavBarHome from "../Components/NavBarHome";
import styles from "../Styles/Checkout.module.css"

export default function Home() {
   
  const [notification, setNotification] = useState({
    isOpen: false,
    type: null,
    content: "",
  });


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");

    if (status === "approved") {
      setNotification({
        content: "Payment successful!",
        isOpen: true,
        type: "approved",
      });
    } else if (status === "failure") {
      setNotification({
        content: "Payment rejected!",
        isOpen: true,
        type: "failure",
      });
    }

    setTimeout(() => {
      setNotification({
        isOpen: false,
        type: null,
        content: "",
      });
    }, 5000);
  }, []);

  return (
    <div>
         <NavBarHome/>
    <div className={styles.container}>
       
      <div className={styles.productContainer}>
        <UserDetail/>

        <div className={styles.data}>
          {Walktypes.map((walk) => (
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
            </div>
          ))}
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
    </div>
  );
}