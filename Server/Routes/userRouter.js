const { Router } = require("express");
const { userHandlerLogin } = require("../Routes/Handlers/");
const { validateUserLogin } = require("./Middlewares");
const { userHandlerRegister }= require('./Handlers/userHandlerRegister')

const userRouter = Router();

//usuarios

userRouter.post("/login", validateUserLogin, userHandlerLogin);
userRouter.post("/register", userHandlerRegister);


module.exports = userRouter;