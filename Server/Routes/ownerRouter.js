const { Router } = require("express");
const { ownerHandlerPost } = require("./Handlers");

const ownerRouter = Router();

//owner routes
ownerRouter.post("/", ownerHandlerPost);



module.exports = ownerRouter;