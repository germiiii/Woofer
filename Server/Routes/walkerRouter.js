const { Router } = require("express");
const { walkerHandlerPost } = require("./Handlers");

const walkerRouter = Router();

//walker routes
walkerRouter.post("/", walkerHandlerPost);



module.exports = walkerRouter;