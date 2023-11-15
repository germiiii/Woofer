const express = require('express');
const userRouter = require('./userRouter');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', userRouter);

module.exports = router;
