const { Router } = require("express");
const {
  walkHandlerPost
} = require("./Handlers");

const walkRouter = Router();

//owner routes
walkRouter.post("/", walkHandlerPost);

module.exports = walkRouter;
