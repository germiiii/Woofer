const { Router } = require("express");
const { walkerHandlerPost } = require("./Handlers");
const { walkersHandlerGetAll } = require("./Handlers/handlerGetWalkers");

const walkerRouter = Router();

//walker routes
walkerRouter.post("/", walkerHandlerPost);
walkerRouter.get('/', walkersHandlerGetAll)



module.exports = walkerRouter;