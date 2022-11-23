const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-JWT");

const login = async(req,res = response) =>{

    const {email, password} = req.body;

    try {

        //verficiar si el email existe
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                msg: 'User/Password incorrect - status: false'
            })
        }
  
        // si el usuario esta activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'User/Password incorrect - status: false'
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/Password incorrect - Password'
            })
        }

        //generar el JWT
        const token = await generateJWT( user.id );
 
        res.json({
            msg: 'Login ok',
            user,
            token
        })
     
    } catch (error) {
        return res.status(500).json({
            msg: 'Contact the admin!'
        })
    }

 
}

const googleSignIn = async(req, res = response) => {

    const { id_token} = req.body;

    res.json({
        msg: 'All OK!',
        id_token
    })
}

module.exports = {
    login,
    googleSignIn
}