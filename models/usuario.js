const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'The name in UsuarioSchema is required'],
    },
    correo: {
        type: String,
        required: [true, 'The correo in UsuarioSchema is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The password in UsuarioSchema is required'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'The rol in UsuarioSchema is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SUPER_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
});

//^ El siguiente metodo quitará los objetos de mi schema que no quiero mostrar
//^{-K nñb{}} utilizar el this dentro de la funcion y la funcion flecha mantiene el this fuera de la función
UsuarioSchema.methods.toJSON = function () {
    //^ estoy sacando versió y password de UsuarioSchema y estoy 
    //^ almacenando el resto en un objeto llamado usuario
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('Usuario', UsuarioSchema);