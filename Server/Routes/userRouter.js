const { Router } = require("express");
const { userHandlerLogin } = require("../Routes/Handlers/");
const { validateUser, validateUserLogin } = require("./Middlewares");
const { userHandlerRegister }= require('./Handlers/userHandlerRegister')
<<<<<<< HEAD
const { userHandlerChangePassword } = require ('./Handlers/passwordHandlerChange')
const { userGetAllHandler } = require ('./Handlers/userGetHandler')
=======
>>>>>>> dab60942df25c90a6423c0ba4a0d1db091195e6c

const userRouter = Router();

//usuarios

userRouter.post("/login", validateUserLogin, userHandlerLogin);
userRouter.post("/register", userHandlerRegister);
<<<<<<< HEAD
userRouter.post('/changePassword', userHandlerChangePassword)
userRouter.get("/users", userGetAllHandler);
=======

>>>>>>> dab60942df25c90a6423c0ba4a0d1db091195e6c

module.exports = userRouter;
