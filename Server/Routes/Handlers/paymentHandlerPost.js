const PaymentController = require("../Controllers/PaymentController");
const PaymentService = require("../Services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

const paymentHandlerPost = async (req, res) => {
  PaymentInstance.getPaymentLink(req, res);
};

module.exports = {
  paymentHandlerPost,
};
