const express = require('express');
const postUser = require('../controllers/postRegister');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/register', postUser);



module.exports = router;
