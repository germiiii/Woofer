const { Router } = require("express");
const { ownerHandlerPost, dogHandlerPost, getDogs } = require("./Handlers");

const ownerRouter = Router();

//owner routes
ownerRouter.post("/", ownerHandlerPost);
ownerRouter.post("/dog", dogHandlerPost);
ownerRouter.get("/dog/:username", getDogs); //???

module.exports = ownerRouter;
