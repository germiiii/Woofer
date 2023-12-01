const { Router } = require("express");
const {
  walkerHandlerPost,
  walkerHandlerSetAvailable,
  walkerHandlerGetAll,
} = require("./Handlers");
const {
  walkerHandlerGetAvailable,
} = require("./Handlers/walkerHandlerGetAvailable");

const walkerRouter = Router();

//walker routes
walkerRouter.post("/", walkerHandlerPost);
walkerRouter.get("/all", walkerHandlerGetAll);
walkerRouter.get("/available", walkerHandlerGetAvailable);
walkerRouter.put("/:id", walkerHandlerSetAvailable);

module.exports = walkerRouter;
