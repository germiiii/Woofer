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
walkerRouter.get("/", walkerHandlerGetAll);
walkerRouter.get("/available", walkerHandlerGetAvailable);
walkerRouter.get("/:id", walkerHandlerGetById);
walkerRouter.put("/:id", walkerHandlerSetAvailable);

module.exports = walkerRouter;
