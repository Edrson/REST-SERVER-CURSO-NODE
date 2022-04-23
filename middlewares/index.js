/* const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles'); */

//*defino constantes que contengan tooodo lo que exportan los archivos
const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    //* acá utilizar el operador spred que es ... para indicar que exporte todo lo que
    //* contenga validaCampos y así con el resto de constantes
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}