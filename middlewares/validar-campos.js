const { validationResult } = require('express-validator');
const { request, response } = require('express');

// los middlewares tienen tres argumentos:req,res y una función llamada next, que se ejecuta
// si se pasan todas las validaciones, y quiere decir que continúe con el siguiente middleware  
const validarCampos = (req = request, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

module.exports = {
    validarCampos
}