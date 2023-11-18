const { Router } = require("express");
const {
  ownerHandlerPost,
  dogHandlerPost,
  dogHandlerGet,
} = require("./Handlers");

const ownerRouter = Router();

//owner routes
ownerRouter.post("/", ownerHandlerPost);
ownerRouter.post("/dog", dogHandlerPost);
ownerRouter.get("/dog/:username", dogHandlerGet); //???

module.exports = ownerRouter;
