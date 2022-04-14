//*Podemos definir este archivo, por ejemplo para que sean las rutas de los usuarios, por decir algo.

const { usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut } = require('../controllers/usuarios.controllers');

//^ desestructurar la funcion Router de express
const { Router } = require('express');

const router = Router();

//^definimos las rutas para router
router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/', usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

//^ Exportamos router
module.exports = router;