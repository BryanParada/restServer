const { response } = require('express'); //ayuda para ver intellissense de la response
const bcryptjs = require('bcryptjs');

const User = require('../models/user'); 

const userGet = (req = request, res = response) => {

  const {q, name = 'optionalName', page = 1,  apikey, limit} = req.query; //req.params

    res.json({ 
        msg: 'get API - Controller',
        q,
        name,
        apikey,
        page,
        limit
    });
  }

const userPut = async(req, res) => {
    //res.status(500).json({ 

    //http://localhost:8080/api/users/10

    const {id} = req.params;
    const { _id, password, google, email,  ...restOfArguments } = req.body;

    //TODO: validar contra base de datos
    if (password) {
      
       //encriptar password
      const salt = bcryptjs.genSaltSync(); 
      restOfArguments.password = bcryptjs.hashSync(password, salt);

    }

    const userDB = await User.findByIdAndUpdate( id, restOfArguments, {new: true} )

    res.json({ 
        msg: 'put API - Controller', 
        userDB
    });
  }

const userPost = async(req, res) => {
 
    const {name, email, password, role } = req.body; 
    //const {google, ...rest } = req.body; //para muchos elementos mandar rest a new User(rest)
    const user = new User({name, email, password, role});
 
    //encriptar password
    const salt = bcryptjs.genSaltSync(); //10 vueltas por defecto
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await user.save();

    // res.status(201).json({ 
    res.json({ 
        msg: 'post API - Controller',
        user
    });
  }

const userDelete = (req, res) => {
    res.json({ 
        msg: 'delete API - Controller'
    });
  }

const userPatch = (req, res) => {
    res.json({ 
        msg: 'patch API - Controller'
    });
  }


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}