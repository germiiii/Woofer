class PaymentController {
    constructor(paymentService) {
      this.paymentService = paymentService;
    }
  
    async getPaymentLink(req, res) {
      try {
        const { title, price, description } = req.body; // Assuming these values are sent in the request
        const preferenceId = await this.paymentService.createMercadoPagoPreference(title, price, description);
        return res.json({ preferenceId });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, msg: 'Failed to create payment' });
      }
    }
  }
  
  module.exports = PaymentController;
  