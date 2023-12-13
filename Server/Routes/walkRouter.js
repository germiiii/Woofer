const { Router } = require("express");
const { validateWalkData } = require("./Middlewares");

const {
  walkHandlerPost,
  walkHandlerPut,
  walkHandlerGet,
  walkHandlerGetByWalker,
  walkHandlerGetByOwner,
} = require("./Handlers");

const walkRouter = Router();

//walk routes
walkRouter.post("/", validateWalkData, walkHandlerPost);
walkRouter.put("/:walkId", walkHandlerPut);
walkRouter.get("/walker/:walkerId", walkHandlerGetByWalker);
walkRouter.get("/owner/:ownerId", walkHandlerGetByOwner);
walkRouter.get("/", walkHandlerGet);

module.exports = walkRouter;
