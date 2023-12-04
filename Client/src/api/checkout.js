
import paypal from '@paypal/checkout-server-sdk';
import fetch from 'node-fetch';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const tokenUrl = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';

export default async function CheckoutHandler(req, res) {
  try {
    const { serviceId } = req.body; // Get the serviceId from the request body

    // Fetch details of the selected service using the serviceId
    let selectedService = null;
    switch (serviceId) {
      case 1:
        selectedService = {
          name: '15 minute Premium dog walk',
          description: 'Woofers will devote their full attention to walk your furry companion privately for 15 minutes.',
          quantity: '1',
          price: '30.00',
        };
        break;
      case 2:
        selectedService = {
          name: '30 minute Premium dog walk',
          description: 'Woofers will devote their full attention to walk your furry companion privately for 30 minutes.',
          quantity: '1',
          price: '35.00',
        };
        break;
      case 3:
        selectedService = {
          name: '60 minute Premium dog walk',
          description: 'Woofers will devote their full attention to walk your furry companion privately for 60 minutes.',
          quantity: '1',
          price: '45.00',
        };
        break;
      default:
        res.status(400).json({ error: 'Invalid serviceId' });
        return;
    }

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

    // Create a PayPal order for the selected service
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: selectedService.price, // Use the price from the selected service
          },
          items: [
            {
              name: selectedService.name,
              description: selectedService.description,
              quantity: selectedService.quantity,
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

