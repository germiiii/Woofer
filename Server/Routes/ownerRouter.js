const { Router } = require("express");
const ownerRouter = Router();
const {
  ownerHandlerPost,
  dogHandlerPost,
  dogHandlerGet,
  ownerHandlerGetAll,
  ownerHandlerGetById,
} = require("./Handlers");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

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

//owner routes
ownerRouter.get("/:id", ownerHandlerGetById);
ownerRouter.get("/", ownerHandlerGetAll);
ownerRouter.get("/dog/:username", dogHandlerGet);
ownerRouter.post("/dog", upload.single("image"), dogHandlerPost);
ownerRouter.post("/", upload.single("image"), ownerHandlerPost);

module.exports = ownerRouter;
