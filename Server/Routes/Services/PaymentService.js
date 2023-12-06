const axios = require("axios");
const { MERCADOPAGO_ACCESS_TOKEN } = process.env;

class PaymentService {
  async createPayment(payer_email, title, description, price) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      // payer_email: "test_user_1799419244@testuser.com",
      payer_email: payer_email,
      items: [
        {
          title: title,
          description: description,
          picture_url:
            "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
          quantity: 1,
          unit_price: parseFloat(price),
        },
      ],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      //   notifications_url: "http://localhost:3000/notifications",
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });
    return payment.data;
  }
}

module.exports = PaymentService;
