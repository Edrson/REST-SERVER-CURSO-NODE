//*Podemos definir este archivo, por ejemplo para que sean las rutas de las autenticaciones, por decir algo.

// desestructurar la funcion Router de express
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/login', [
    check('correo', 'correo es obligatorio').isEmail(),
    check('password', 'password es requerido').not().isEmpty(),
    validarCampos,
], login);


// Exportamos router
module.exports = router;