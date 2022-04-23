//*desde este archivo se controlaran las acciones de las rutas.

// Requerir los siguietes objetos de express, para que dentro de los métodos tengamos
// la facilidad de que por medio del . poder acceder a sus propiedades
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
require('colors');
const Usuario = require('../models/usuario');
//const { validationResult } = require('express-validator');

// Igualar req y res con lo desestructurado de express anteriormente.
const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    /* 
        //const total = await Usuario.countDocuments({ estado: true });
        const total = await Usuario.countDocuments(query);
        //const usuarios = await Usuario.find({ estado: true })
        const usuarios = await Usuario.find(query)
            .limit(Number(limite)) //limite de registros
            .skip(desde);          //desde que registro mostrar
    
     */

    // Lo anterior lo podemos hacer en un Promise.all para que se ejecuten las promesas al mismo tiempo ya que
    // una no depende de la otra
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limite)) //limite de registros
            .skip(desde),          //desde que registro mostrar
    ]);

    res.json({
        total,
        usuarios
    });
    //* con res.send se envia respuesta en formato text/html, por eso si queremos enviar json cambiar a res.json
    //res.send('Hello World')
}
const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO, validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}
const usuariosPost = async (req = request, res = response) => {
    try {
        /*const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }*/
        const { nombre, correo, password, rol } = req.body;
        const usuario = new Usuario({ nombre, correo, password, rol });
        //const usuario = new Usuario(body);

        //*Verificar si el correo existe
        /* const existeEmail = await Usuario.findOne({ correo });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'El correo ya esta registrado'
            })
        } */

        //*Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //*Guardar en BD
        await usuario.save();

        res.json({
            usuario
        })
    } catch (error) {
        res.status(406).json({
            "msg": "dup key"
        })
        console.log(error.message.red);
    }
}
const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;

    const uid = req.uid;//este es el objeto que se le agrego al req en el middleware validarJWT
    //Borrar fisicamente, esta forma no se recomienda ya que de sierta forma se pierde la integridad referencial.
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrar atravez de actualización de un estado
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({ usuario });
}
const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch  API - controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}