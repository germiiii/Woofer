const axios = require("axios");
const mercadopago = require("mercadopago"); //!
const {OWNER_PUBLIC_KEY, OWNER_ACCESS_TOKEN, WALKER_PUBLIC_KEY, WALKER_ACCESS_TOKEN } = require('../../config') 

class PaymentService {
  constructor() {
    mercadopago.configure({
      access_token: process.env.WALKER_ACCESS_TOKEN // Your MercadoPago access token
    });
  }

  async createMercadoPagoPreference(description, price) {
    try {
      const preference = {
        items: [
          {
            title: description,
            unit_price: price,
            quantity: 1
          }
        ],
        back_urls: {
          success: 'http://localhost:3000',
          failure: 'http://localhost:3000',
         
        },
        auto_return: 'approved'
      };

      const response = await mercadopago.preferences.create(preference);
      return response.body.id;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating MercadoPago preference');
    }
  }
}

module.exports = PaymentService;
