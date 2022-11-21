const { response } = require('express'); //ayuda para ver intellissense de la response
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { validationResult } = require('express-validator');

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

const userPut = (req, res) => {
    //res.status(500).json({ 

    //http://localhost:8080/api/users/10

    const id = req.params.id;

    res.json({ 
        msg: 'put API - Controller',
        id
    });
  }

const userPost = async(req, res) => {


  const errors = validationResult(req);
  if (!errors.isEmpty() ){
    return res.status(400).json(errors);
  }

    const {name, email, password, role } = req.body; 
    //const {google, ...rest } = req.body; //para muchos elementos mandar rest a new User(rest)
    const user = new User({name, email, password, role});

    //Verificar si correo existe
    const existEmail = await User.findOne({ email: email});
    if (existEmail) {
      return res.status(400).json({
        msg: `An account with Email ${email} already exists`
      })
    }

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