const express = require('express');
const userRouter = require('./userRouter');
const ownerRouter = require('./ownerRouter');
const walkerRouter = require('./walkerRouter');
const walkRouter = require('./walkRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', userRouter);
router.use('/owner', ownerRouter);
router.use('/walk', walkRouter);
router.use('/walker', walkerRouter);


module.exports = router;
