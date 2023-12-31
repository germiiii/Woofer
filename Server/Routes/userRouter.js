const { Router } = require("express");
const { userHandlerLogin, userGetByIdHandler, wooferGetAnalytics } = require("../Routes/Handlers/");
const { validateUser, validateUserLogin } = require("./Middlewares");
const { userHandlerRegister }= require('./Handlers/userHandlerRegister')
const { userHandlerChangePassword } = require ('./Handlers/userHandlerChangePassword')
const { userGetAllHandler } = require ('./Handlers/userGetHandler');
const { userHandlerEdit } = require("./Handlers/userHandlerEdit");
const { googleLogin } = require("./Controllers/googleLogin");
const { activateAccount } = require('./Controllers/activateAccount')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const {changePassword} = require("./Controllers/changePassword");
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "woofer",
    },
  });

const upload = multer({ storage: storage });

const userRouter = Router();

//usuarios

userRouter.post("/login", validateUserLogin, userHandlerLogin);
userRouter.post("/register", upload.single("image"), userHandlerRegister);
userRouter.post('/googleLogin', googleLogin)
userRouter.post('/activateAccount/:verificationToken', activateAccount);
userRouter.post('/changePassword/:token', changePassword)

userRouter.post('/changePassword', userHandlerChangePassword)
userRouter.get("/users/:id", userGetByIdHandler);
userRouter.get("/users", userGetAllHandler);
userRouter.put("/editUser", upload.single("image"), userHandlerEdit);

userRouter.get("/analytics", wooferGetAnalytics );


module.exports = userRouter;
