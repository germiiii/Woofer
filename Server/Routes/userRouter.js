const { Router } = require("express");
const { userHandlerLogin } = require("../Routes/Handlers/");
const { validateUser, validateUserLogin } = require("./Middlewares");

const userRouter = Router();

//usuarios
userRouter.post("/login", userHandlerLogin);
// userRouter.post("/register", userHandlerPost);


module.exports = userRouter;