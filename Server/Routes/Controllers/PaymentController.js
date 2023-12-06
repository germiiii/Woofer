class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    const { payer_email, title, description, price } = req.body;
    if (!title || !price || !payer_email) {
      return res.status(400).json({ error: true, msg: "Faltan datos" });
    }
    try {
      const payment = await this.subscriptionService.createPayment(
        payer_email,
        title,
        description,
        price
      );
      return res.json(payment);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        msg: "Failed to create payment",
      });
    }
  }
}

module.exports = PaymentController;
