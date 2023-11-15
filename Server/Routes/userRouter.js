const { Router } = require("express");
const { userHandlerLogin } = require("../Routes/Handlers/");
const { validateUser, validateUserLogin } = require("./Middlewares");
const { userHandlerRegister }= require('./Handlers/userHandlerRegister')
const { userHandlerChangePassword } = require ('./Handlers/passwordHandlerChange')

const userRouter = Router();

//usuarios

userRouter.post("/login", validateUserLogin, userHandlerLogin);
userRouter.post("/register", userHandlerRegister);
userRouter.post('/changePassword', userHandlerChangePassword)


module.exports = userRouter;