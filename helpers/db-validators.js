const Role = require('../models/role');


const isValidRole = async(role = '') =>{
    const existsRole = await Role.findOne({ role });
    if ( !existsRole ){
      throw new Error(`The Role ${role} is not stored in the DataBase`)
    }
}

module.exports = {
    isValidRole
}