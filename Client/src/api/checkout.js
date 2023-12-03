// pages/api/paypal.js
import paypal from '@paypal/checkout-server-sdk';
import fetch from 'node-fetch';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const tokenUrl = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';

export default async function CheckoutHandler(req, res) {
  try {
    // Get the access token
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Use the obtained access token for PayPal API requests
    const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret, accessToken);
    const client = new paypal.core.PayPalHttpClient(environment);

    // Create a PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '30.00',
          },
          items: [
            {
              name: '15 minute Premium dog walk',
              description: 'Woofers will devote their full attention to walk your furry companion privately for 15 minutes.',
              quantity: '1',
            },
          ],
        },
      ],
    });

    const response = await client.execute(request);
    console.log(response);

    res.status(200).json({
      id: response.result.id,
      // Additional data if needed
    });
  } catch (error) {
    console.error('PayPal API error:', error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
}



// import paypal from '@paypal/checkout-server-sdk'
// import { NextResponse } from 'next/server'

// const clientId = 'AahLJYwOxpB8rxP5MCqopNDEgLYJFoaNOxwA0BmVEEzeJCj9yYml78eYMLTpAjVAjYS4svveNkYIXGeF'
// const clientSecret = 'EOkdKdHrKXKUZVvjjKJMZGB37imq1nQhcfZZS70Ce8x5GWDnlGhv49g8tY17xj9xAr1_qt_-RSMiq38k'

// const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
// const client = new paypal.core.PayPalHttpClient(environment)

// export async function POST() {
 
//         const request = new paypal.orders.OrdersCreateRequest()

//         request.requestBody({
//             intent: 'CAPTURE',
//             purchase_units: [
//                 {
//                     amount: {
//                         currency_code: 'USD',
//                         value: '30.00',
//                     },
//                     items: [
//                         {
//                             name: '15 minute Premium dog walk',
//                             description: 'Woofers will devote their full attention to walk your furry companion privately for 15 minutes.',
//                             quantity: '1'
//                         }
//                     ]
//                 }
//             ]
//         })

//         const response = await client.execute(request)
//         console.log(response)

//       return NextResponse.json({
//         id: response.result.id
//       })
    

   
// }
