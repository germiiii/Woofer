const { Router } = require("express");
const {
  userHandlerActivate,
  userHandlerDeActivate,
  ownerHandlerDeActivate,
  ownerHandlerActivate,
  walkerHandlerActivate,
  walkerHandlerDeActivate,
} = require("./Handlers");

const userRouter = Router();

//users
userRouter.delete("/users/:id", userHandlerDeActivate);
userRouter.put("/users/:id", userHandlerActivate);

//owner
userRouter.delete("/owner/:id", ownerHandlerDeActivate);
userRouter.put("/owner/:id", ownerHandlerActivate);

//walker
userRouter.delete("/walker/:id", walkerHandlerDeActivate);
userRouter.put("/walker/:id", walkerHandlerActivate);

module.exports = userRouter;
