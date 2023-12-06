const { Router } = require("express");
const { paymentHandlerPost } = require("./Handlers");

const paymentRouter = Router();

paymentRouter.post("/", paymentHandlerPost);

module.exports = paymentRouter;
