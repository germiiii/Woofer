const { Router } = require("express");
const ownerRouter = Router();
const {
  ownerHandlerPost,
  dogHandlerPost,
  dogHandlerGet,
  ownerHandlerGetAll,
} = require("./Handlers");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

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

//owner routes
ownerRouter.post("/", upload.single("image"), ownerHandlerPost);
ownerRouter.get("/", ownerHandlerGetAll);
ownerRouter.post("/dog", upload.single("image"), dogHandlerPost);
ownerRouter.get("/dog/:username", dogHandlerGet);

module.exports = ownerRouter;
