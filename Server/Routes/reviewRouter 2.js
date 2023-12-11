const { Router } = require("express");
const {
  reviewHandlerPost,
  reviewHandlerGet
} = require("./Handlers");

const reviewRouter = Router();

//Reviews routes
reviewRouter.post("/", reviewHandlerPost);
reviewRouter.get("/", reviewHandlerGet);
reviewRouter.get("/:id", reviewHandlerGet);


module.exports = reviewRouter;
