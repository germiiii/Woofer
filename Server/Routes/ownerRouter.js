const { Router } = require("express");
const { ownerHandlerPost } = require("./Handlers");

const ownerRouter = Router();

//owner routes
ownerRouter.post("/", ownerHandlerPost);
ownerRouter.post("/dog", dogHandlerPost);

module.exports = ownerRouter;
