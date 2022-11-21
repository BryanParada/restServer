//ayuda para ver intellissense de la response
const { response } = require('express')
const User = require('../models/user')

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

    const body = req.body; 
    const user = new User(body);

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