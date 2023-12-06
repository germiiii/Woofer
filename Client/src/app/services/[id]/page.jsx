"use client"
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import "tailwindcss/tailwind.css";
import Link from 'next/link';

const Detail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [service, setService] = useState({});

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_APIURL;
        const response = await axios.get(`${api}/walkType/${id}`);
        const data = response.data;

        // console.log('Data:', data);

        if (data) {
          setService(data); // Assuming response data is the service object
        } else {
          window.alert('No hay información para ese ID');
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
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
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;
    const storedAccessToken = localStorage.getItem('accessToken');
  
    async function fetchAccessToken() {
      try {
        const { data } = await axios.post(
          'https://api-m.sandbox.paypal.com/v1/oauth2/token',
          'grant_type=client_credentials',
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
          }
        );
        const expiresIn = data.expires_in;
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('tokenExpiration', expirationTime);
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    }
  
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (!storedAccessToken || !tokenExpiration || Date.now() > tokenExpiration) {
      fetchAccessToken();
    } else {
      setAccessToken(storedAccessToken);
    }
    
  }, [clientId, clientSecret, setAccessToken]); 
  
  
  
  console.log(accessToken)
  
  
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
    <h1 className="text-4xl font-bold mb-2">Service Details</h1>
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
              <h2>{service.walkTypeData.title}</h2>
              <h2>{service.walkTypeData.price}</h2>
              <h2>{service.walkTypeData.description}</h2>
            </div>
          ) : (
            <p>No hay información disponible para ese servicio</p>
          )}
          <div className="mt-4">
            <PayPalScriptProvider
              options={{
                clientId: 'AahLJYwOxpB8rxP5MCqopNDEgLYJFoaNOxwA0BmVEEzeJCj9yYml78eYMLTpAjVAjYS4svveNkYIXGeF'
              }}
            >
              <PayPalButtons
                style={{ 
                  layout: "horizontal", 
                  color: "gold", 
                  label: "pay",
                  shape: "pill",
                }}
                createOrder={async (data, actions) => {
                  try {
                    const res = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                      },
                      body: JSON.stringify({
                        intent: 'CAPTURE',
                        purchase_units: [
                          {
                            amount: {
                              currency_code: 'USD',
                              value: service.walkTypeData.price, // Use the service price from props
                            },
                            description: service.walkTypeData.description, // Use service description from props
                          },
                        ],
                      }),
                    });
                    const order = await res.json();
                    console.log(order);
                    return order.id; 
                  } catch (error) {
                    console.error('Error creating PayPal order:', error);
                  }
                }}
                onCancel={(data) => {
                  console.log("Cancelled:", data);
                }}
                onApprove={(data, actions) => {
                  console.log("Approved:", data);
                  actions.order.capture();
                  alert('Payment successful')
                  setTimeout(() => {
                    router.push('/home');
                  }, 3000); 
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default Detail;
