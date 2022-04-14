//*desde este archivo se controlaran las acciones de las rutas.

//^ Requerir los siguietes objetos de express, para que dentro de los métodos tengamos
//^ la facilidad de que por medio del . poder acceder a sus propiedades
const { request, response } = require('express');

//^ Igualar req y res con lo desestructurado de express anteriormente.
const usuariosGet = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey, page = '10', limit } = req.query;
    res.json({
        msg: 'get  API - controller',
        q,
        nombre,
        apikey,
        page,
        limit
    })
    //* con res.send se envia respuesta en formato text/html, por eso si queremos enviar json cambiar a res.json
    //res.send('Hello World')
}
const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put  API - controller',
        id
    })
}
const usuariosPost = (req = request, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post  API - controller',
        nombre,
        edad
    })
}
const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete  API - controller'
    })
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