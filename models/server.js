const express = require('express')
var cors = require('cors')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutesPath = '/api/users';

        // MIDDLEWARES - funcion que siempre se ejecutará cuando se levante el server
        this.middlewares();

        // RUTAS DE APP
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors()); 

        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        
        this.app.use(this.usersRoutesPath, require('../routes/user.routes'))


    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port: ', this.port);
            
        } )
         
    }


}

module.exports = Server;