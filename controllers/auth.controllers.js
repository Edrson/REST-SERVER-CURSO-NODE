//*desde este archivo se controlaran las acciones de las rutas para autenticaciones

const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    try {
        const { correo, password } = req.body;

        //verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario/password no son correctos - correo",
            })
        }

        //verificar si el usuario esta activo en al BD
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario/password no son correctos - usuario con estado invalido",
            })
        }
        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'usuario/password no son correctos, - password',
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        //^ Nota importante, solo podemos tener un res.json en todo nuestro flujo, o controlador.
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'hable con el administrador',
        });
    }
}


module.exports = {
    login
}