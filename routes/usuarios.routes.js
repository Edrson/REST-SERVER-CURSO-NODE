//*Podemos definir este archivo, por ejemplo para que sean las rutas de los usuarios, por decir algo.

const { check } = require('express-validator');
// desestructurar la funcion Router de express
const { Router } = require('express');
require('colors');

//? todas estas importaciones que vienen de la misma carpeta middlewares se puede optimizar******
/* const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles'); */
//? *********************************************************************************************

//? y se optimizan de la siguiente forma ********************************************************
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares/index');
//? *********************************************************************************************

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')
//const Role = require('../models/role')

const { usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut } = require('../controllers/usuarios.controllers');


const router = Router();

//definimos las rutas para router
router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom((id = '') => existeUsuarioPorId(id)),
    check('rol').custom((rol = '') => esRoleValido(rol)),
    validarCampos,
], usuariosPut);
// si le enviamos 3 parametros al metodo del router, el segundo lo tomara como middleware, ya que
// express-validator trabaja como middleware, este middleware se lo podemos pasar como array
router.post('/', [
    // del objeto request tomar 'correo', luego mensaje si no cumple validacion y por ultimo contra que vamos a validar.
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio y debe tener entre 6 y 15 caracteres').isLength({ min: 6, max: 15 }),
    //check('rol', 'no es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    /*check('rol').custom(async (rol = '') => {
        const existeRol = await Role.findOne({ rol })
        if (!existeRol) {
            throw new Error(`Ell rol ${rol} no esta registrado en la base de datos`)
        }
    }),*/
    check('rol').custom((rol = '') => esRoleValido(rol)),
    check('correo').custom(correo => emailExiste(correo)),
    // validarCampos es el middleware que nosotros creamos :)
    validarCampos,

], usuariosPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),//este middleware nuestro es distinto ya que recibe argumentos, es especial dentro de el se tiene que retornar una función...
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom((id = '') => existeUsuarioPorId(id)),
    validarCampos,
], usuariosDelete);
router.patch('/', usuariosPatch);

// Exportamos router
module.exports = router;