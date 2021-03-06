const Role = require('../models/role');
const Usuario = require('../models/usuario');
require('colors');


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`Ell rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`)
        /*   return res.status(400).json({
              msg: 'El correo ya esta registrado'
          }) */
    }
}
const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    //console.log('existeUsuario', existeUsuario);
    if (!existeUsuario) {
        throw new Error(`El  id ${id} no existe en la base de datos`)
        /*   return res.status(400).json({
              msg: 'El correo ya esta registrado'
          }) */
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
}