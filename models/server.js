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
        this.app.get('/api', (req, res) => {
            res.json({ 
                msg: 'get API'
            });
          });

          this.app.put('/api', (req, res) => {
            res.json({ 
                msg: 'put API'
            });
          });

          this.app.post('/api', (req, res) => {
            res.json({ 
                msg: 'post API'
            });
          });

          this.app.delete('/api', (req, res) => {
            res.json({ 
                msg: 'delete API'
            });
          });

          this.app.patch('/api', (req, res) => {
            res.json({ 
                msg: 'patch API'
            });
          });
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port: ', this.port);
            
        } )
         
    }


}

module.exports = Server;