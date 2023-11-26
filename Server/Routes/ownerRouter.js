const { Router } = require("express");
const {
  ownerHandlerPost,
  dogHandlerPost,
  dogHandlerGet,
  ownerHandlerGetAll,
} = require("./Handlers");

const ownerRouter = Router();

//owner routes
ownerRouter.post("/", ownerHandlerPost);
ownerRouter.get("/", ownerHandlerGetAll);
ownerRouter.post("/dog", dogHandlerPost);
ownerRouter.get("/dog/:username", dogHandlerGet);

module.exports = ownerRouter;
