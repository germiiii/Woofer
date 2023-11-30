const { CreatePreferencePayload } = require("mercadopago/models/preferences/create-payload.model");
const { NextApiRequest, NextApiResponse } = require("next");
const PriceList = require("../../PriceList/PriceList");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.WOOFER_ACCESS_TOKEN,
});

const MercadoPagoHandler = async (req, res) => {
  if (req.method === "POST") {
    const productName = req.body.product; // Assuming productName is sent in the request body

    const URL = "http://localhost:3000";

    try {
      // Lookup the product based on the productName in the PriceList
      const product = PriceList[productName];

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const preference = {
        items: [
          {
            title: product.title,
            unit_price: product.price,
            quantity: 1,
          },
        ],
        auto_return: "approved",
        back_urls: {
          success: `${URL}`,
          failure: `${URL}`,
        },
        notification_url: `${URL}/api/notify`,
      };

      const response = await mercadopago.preferences.create(preference);

      res.status(200).send({ url: response.body.init_point });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
};

module.exports = MercadoPagoHandler;
