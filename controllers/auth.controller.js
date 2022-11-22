const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

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
 
        if (!user.status) {
            return res.status(400).json({
                msg: 'User/Password incorrect - status: false'
            })
        }

        // si el usuario esta activo
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/Password incorrect - Password'
            })
        }

        //verificar la contraseña


        //generar el JWT







        res.json({
            msg: 'Login ok' 
        })
     
    } catch (error) {
        return res.status(500).json({
            msg: 'Contact the admin!'
        })
    }

 
}

module.exports = {
    login
}