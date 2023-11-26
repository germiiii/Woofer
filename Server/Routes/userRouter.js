const { Router } = require("express");
const { userHandlerLogin, userGetByIdHandler } = require("../Routes/Handlers/");
const { validateUser, validateUserLogin } = require("./Middlewares");
const { userHandlerRegister }= require('./Handlers/userHandlerRegister')
const { userHandlerChangePassword } = require ('./Handlers/userHandlerChangePassword')
const { userGetAllHandler } = require ('./Handlers/userGetHandler');
const { googleLogin } = require("./Controllers/googleLogin");


const userRouter = Router();

//usuarios

userRouter.post("/login", validateUserLogin, userHandlerLogin);
userRouter.post("/register", userHandlerRegister);
userRouter.post('/googleLogin', googleLogin)

userRouter.post('/changePassword', userHandlerChangePassword)
userRouter.get("/users/:id", userGetByIdHandler);
userRouter.get("/users", userGetAllHandler);

module.exports = userRouter;
