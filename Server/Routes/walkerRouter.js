const { Router } = require("express");
const {
  walkerHandlerPost,
  walkerHandlerPut,
  walkerHandlerGetById,
  walkerHandlerGetAll,
  walkerHandlerGetAvailable,   
} = require("./Handlers");


const walkerRouter = Router();

//walker routes
walkerRouter.get("/", walkerHandlerGetAll);
walkerRouter.get("/available", walkerHandlerGetAvailable);
walkerRouter.get("/:id", walkerHandlerGetById);
walkerRouter.post("/", walkerHandlerPost);
walkerRouter.put("/:id", walkerHandlerPut);

module.exports = walkerRouter;
