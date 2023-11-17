const { Router } = require("express");
const { userHandlerLogin } = require("../Routes/Handlers/");
const { validateUserLogin } = require("./Middlewares");
const { userHandlerRegister }= require('./Handlers/userHandlerRegister')

//const { userHandlerChangePassword } = require ('./Handlers/passwordHandlerChange')
const { userGetAllHandler } = require ('./Handlers/userGetHandler')

const userRouter = Router();

//usuarios

userRouter.post("/login", validateUserLogin, userHandlerLogin);
userRouter.post("/register", userHandlerRegister);
// userRouter.post('/changePassword', userHandlerChangePassword )
userRouter.get("/users", userGetAllHandler);


module.exports = userRouter;
