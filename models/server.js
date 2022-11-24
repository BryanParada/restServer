const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            product: '/api/products',
            users: '/api/users'
        }
        // this.usersRoutesPath = '/api/users';
        // this.authPath        = '/api/auth'; 

        //Conectar a base de datos
        this.connectDB();

        // MIDDLEWARES - funcion que siempre se ejecutará cuando se levante el server
        this.middlewares();

        // RUTAS DE APP
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors()); 

        //Lectura y parseo del body
        this.app.use( express.json() );

        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.users, require('../routes/user.routes'))
        this.app.use(this.paths.product, require('../routes/products.routes'))
        this.app.use(this.paths.categories, require('../routes/categories.routes'))


    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port: ', this.port);
            
        } )
         
    }


}

module.exports = Server;