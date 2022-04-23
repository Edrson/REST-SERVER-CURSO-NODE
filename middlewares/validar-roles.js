const { request, response } = require("express")


const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: `Se quiere verificar el role sin validar el token primero`
        })
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador. - No puede hacer esto`
        })
    }

    next();
}

// lo que se le envíe a eata función se almacenarpa en un arreglo llamado roles viene de la funcionalidad rest
// notar que este middleware no recive directamente el req,res y next ya que recibe argumentos, por lo tanto dentro de él, se tiene que 
// retornar una función... Importante nunca olvidar llamar la función next() al final de los middleware si todo sale bien.
const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: `Se quiere verificar el role sin validar el token primero`
            })
        }
        console.log(roles, req.usuario.rol);

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            })
        }
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}