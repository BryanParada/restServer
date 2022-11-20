//ayuda para ver intellissense de la response
const { response } = require('express')

const userGet = (req, res = response) => {

    res.json({ 
        msg: 'get API - Controller'
    });
  }

const userPut = (req, res) => {
    //res.status(500).json({ 
    res.json({ 
        msg: 'put API - Controller'
    });
  }

const userPost = (req, res) => {
    // res.status(201).json({ 
    res.json({ 
        msg: 'post API - Controller'
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