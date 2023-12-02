const { Router } = require("express");
const {
  walkerHandlerPost,
  walkerHandlerSetAvailable,
  walkerHandlerGetById,
  walkerHandlerGetAll,
  walkerHandlerGetAvailable
} = require("./Handlers");


const walkerRouter = Router();

//walker routes
walkerRouter.post("/", walkerHandlerPost);
walkerRouter.get("/:id", walkerHandlerGetById);
walkerRouter.get("/", walkerHandlerGetAll);
walkerRouter.get("/available", walkerHandlerGetAvailable);
walkerRouter.put("/:id", walkerHandlerSetAvailable);

module.exports = walkerRouter;
