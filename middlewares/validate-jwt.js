const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) =>{

    const token = req.header('x-token');

    if ( !token) {
        return res.status(401).json({
            msg: 'There is no token in the header request'
        });
    }

    try {
        // const payload = jwt.verify( token, process.env.SECRETORPRIVATEKEY ); 
        // console.log(payload);
        
         const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY ); 
         
         req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid Token'
        })
        
    }

    next();
    


}

module.exports = {
    validateJWT
}