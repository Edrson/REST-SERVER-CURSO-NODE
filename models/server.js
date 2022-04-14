require('dotenv').config();
const express = require('express');
//^ Utilizar cors, para permitir que solo ciertas paginas web puedan acceder a nuestro servicio
//^  si nuestro servicio solo esta dentro de nuestra red de trabajo, no es necesario utilizar cors
//^  pero para todos los demas casos, utilizar cors nos ahorrara muchos dolores de cabeza, por favor 
//^  acostumbremonos a utilizarlo, es un middleware
const cors = require('cors');

class Server {

    //^ Al lanzar una nueva instancia del servidor, se creará la aplicación de express como una
    //^ propiedad en la clase Server
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        //^ Podemos definir la ruta para el API de usuarios!! :)
        this.usuariosPath = '/api/usuarios'

        //^ Middlewares
        this.middlewares();

        //^ Rutas
        //^ Al ejecutarse el constructor, disparamos las rutas, el método configurará las rutas y listo se acabo
        //^ el asunto, ya tenemos las rutas configuradas.
        this.routes();
    }
    //^ Creación de rutas
    routes() {
        //^ cuando pase una solicitud por esta ruta (this.usuariosPath) entonces aqui lo voy a cargar(es 
        //^ como un middleware condicional...) cargar o mandar a llamar usuarios.routes por medio de require...
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log('Server on port ', this.PORT);
        })
    }
    middlewares() {
        //^ CORS
        this.app.use(cors());

        //^ Lectura y parseo del body
        this.app.use(express.json());

        //^ Directorio publico
        //^ .use es la palabra clave para indicar que es un MIDDLAWARE ojo.
        this.app.use(express.static('public'));
    }

}
module.exports = Server;