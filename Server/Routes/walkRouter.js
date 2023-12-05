const { Router } = require("express");
const {
  walkHandlerPost,
  walkHandlerGeAll,
  walkHandlerGetByWalker,
  walkHandlerGetByOwner
} = require("./Handlers");

const walkRouter = Router();

//walk routes
walkRouter.post("/", walkHandlerPost);
walkRouter.get("/walker/:walkerId", walkHandlerGetByWalker);
walkRouter.get("/owner/:ownerId", walkHandlerGetByOwner);
walkRouter.get("/all", walkHandlerGeAll);

module.exports = walkRouter;
