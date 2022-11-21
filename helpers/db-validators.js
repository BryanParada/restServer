const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async(role = '') =>{
    const existsRole = await Role.findOne({ role });
    if ( !existsRole ){
      throw new Error(`The Role ${role} is not stored in the DataBase`)
    }
}

const emailExists = async(email = '') =>{
    const emailExists = await User.findOne({ email: email});
    if (emailExists) {
        throw new Error(`An account with Email ${email} already exists`)
    }

}



module.exports = {
    isValidRole,
    emailExists
}