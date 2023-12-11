const { Router } = require("express");
const { validateWalkData } = require("./Middlewares");

const {
  walkHandlerPost,
  walkHandlerGetAll,
  walkHandlerGetByWalker,
  walkHandlerGetByOwner,
} = require("./Handlers");

const walkRouter = Router();

//walk routes
walkRouter.post("/", validateWalkData, walkHandlerPost);
walkRouter.get("/walker/:walkerId", walkHandlerGetByWalker);
walkRouter.get("/owner/:ownerId", walkHandlerGetByOwner);
walkRouter.get("/all", walkHandlerGetAll);

module.exports = walkRouter;
