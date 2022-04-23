const { request, response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        //si el verify determina que no es un token válido, lanza un throw new error y se va para el catch
        //por eso el catch tiene un res.status...
        //const payload = jwt.verify(token, process.env.SECRETORPROVATEKEY);
        // console.log(payload);
        const { uid } = jwt.verify(token, process.env.SECRETORPROVATEKEY);
        //leer el usuario que corresponde al uid 

        //buscar usuario autenticado: que es el que corresponde al {uid}
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: `token no valido - usuario NO EXISTE EN BD`
            })
        }

        //verificar si el uid tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: `token no valido - usuario con estado :false`
            })
        }


        //le agregamos un parametro al objeto req ya que en javascript los objetos se pasan por referencia
        req.uid = uid;
        req.usuario = usuario;//agregamos un parametro u objeto usuario al request de la petición.
        //siempre llamar next en los middlewares
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: `token no valido`
        })
    }


}
module.exports = {
    validarJWT
}