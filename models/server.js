const express = require('express')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // MIDDLEWARES - funcion que siempre se ejecutará cuando se levante el server
        this.middlewares();

        // RUTAS DE APP
        this.routes();
    }

    middlewares(){
        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.send('Hello World')
          })
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port: ', this.port);
            
        } )
         
    }


}

module.exports = Server;