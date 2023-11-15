const { Router } = require("express");
const { userHandlerLogin } = require("../Routes/Handlers/");
const { validateUser, validateUserLogin } = require("./Middlewares");
const userRegister = require("./Controllers/userRegister");

const userRouter = Router();

//usuarios
userRouter.post("/login", validateUserLogin, userHandlerLogin);
userRouter.post("/register", userRegister);


module.exports = userRouter;