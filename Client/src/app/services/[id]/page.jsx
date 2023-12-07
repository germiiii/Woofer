"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import "./stylesCheckout.css";

const Detail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [service, setService] = useState({});
  const [orderCount, setOrderCount] = useState(0);
  const [accessToken, setAccessToken] = useState("");

  const api = process.env.NEXT_PUBLIC_APIURL;
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;

  console.log("api : ", api)
  console.log("clientId : ", clientId)
  console.log("clientSecret : ", clientSecret)

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get(`${api}/walkType/${id}`);
        const data = response.data;

        if (data) {
          setService(data); // Assuming response data is the service object
        } else {
          window.alert("No hay información para ese ID");
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
        window.alert("Error al obtener detalles del servicio");
      }
    };

    if (id) {
      fetchServiceDetail();
    }

    return () => {
      setService({});
    };
  }, [id]);

  //! PayPal

  useEffect(() => {
    async function fetchAccessToken() {
  try {
    const credentials = `${clientId}:${clientSecret}`;
    const base64Credentials = btoa(credentials);

    const { data } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );

    localStorage.setItem("paypal_accessToken", data.access_token);
  } catch (error) {
    console.error("Error fetching/accessing token:", error);
  }
}
    fetchAccessToken();

    if (!accessToken) {
      const token = localStorage.getItem("paypal_accessToken");
      setAccessToken(token);
    }
  }, []);

  const createOrder = async (data, actions) => {
    try {
      console.log("Creating order...");
      console.log(accessToken);

      if (!accessToken) {
        console.log("Missing token");
        return;
      }

      if (!service.walkTypeData) {
        console.log("Service data not available");
        return;
      }

      const res = await fetch(
        "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: service.walkTypeData.price,
                },
                description: service.walkTypeData.description,
                reference_id: `order-${orderCount}`,
              },
            ],
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const order = await res.json();

      if (order.id) {
        console.log("Order ID:", order.id);
        setOrderCount(orderCount + 1); // Increment order count for the next order
        return order.id;
      } else {
        throw new Error("Order ID not received");
      }
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      // Implement your error handling here
    }
  };

  const handleApprove = (data, actions) => {
    console.log("Approved:", data);
    actions.order.capture();
    alert("Payment successful");
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  };

  const handleCancel = (data) => {
    console.log("Cancelled:", data);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#F39200] bg-opacity-100">
        <div className="container mx-auto lg:py-4 flex items-center justify-between px-2 py-2">
          <Link href={"/"}>
            <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
              <Image src="/LOGOWoofer.png" alt="logo" width={30} height={30} />
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center relative">
        <h1
          className="text-4xl text-[#29235C] font-bold mb-2 mt-11"
          style={{ fontFamily: "LikeEat" }}
        >
          Service Details
        </h1>
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg flex flex-col items-center relative">
          <div className="w-1/2 p-4">
            <Image
              src="/WalkTypeDetail.png"
              alt="Detail"
              width={500}
              height={500}
              className="rounded-full"
            />
          </div>
          <div className="w-1/2 p-4">
            {service.walkTypeData ? (
              <div>
                <h1
                  className="font-bold text-2xl text-[#29235C] "
                  style={{ fontFamily: "LikeEat" }}
                >
                  {service.walkTypeData.title}
                </h1>
                <h2>{service.walkTypeData.description}</h2>
                <h1 className="font-bold text-2xl">
                  Price: ${service.walkTypeData.price}
                </h1>
              </div>
            ) : (
              <p>No hay información disponible para ese servicio</p>
            )}
            <div className="mt-4">
              {accessToken && service.walkTypeData && (
                <PayPalScriptProvider
                  options={{
                    clientId: clientId,
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: "horizontal",
                      color: "gold",
                      label: "pay",
                      shape: "pill",
                    }}
                    createOrder={createOrder}
                    onCancel={handleCancel}
                    onApprove={handleApprove}
                  />
                </PayPalScriptProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
