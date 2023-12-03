const express = require("express");
const activateRouter = require("./activateRouter");
const userRouter = require("./userRouter");
const ownerRouter = require("./ownerRouter");
const walkerRouter = require("./walkerRouter");
const walkRouter = require("./walkRouter");
const walkTypeRouter = require("./walkTypeRouter");

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.post('/register', postUser);

router.use("/", userRouter);
router.use("/activate", activateRouter);
router.use("/owner", ownerRouter);
router.use("/walk", walkRouter);
router.use("/walker", walkerRouter);
router.use("/walkType", walkTypeRouter);

module.exports = router;
