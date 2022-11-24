const Category = require('../models/category');
const Role     = require('../models/role');
const User     = require('../models/user');


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

// const userExistsById = async( id ) =>{
//     const userExists = await User.findById(id);
//     if (!userExists) {
//         throw new Error(`The ID ${id} does not exists`);
//     }

// }

const userExistsById = async( id ) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const userExists = await User.findById( id ).exec();
        if ( !userExists ) {
            throw new Error(`The ID ${id} does not exists`);
        }
    } else {
        throw new Error(`${ id } is not valid`);
    }
};

const existsCategory = async( id ) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const categoryExists = await Category.findById( id ).exec();
        if ( !categoryExists ) {
            throw new Error(`The ID ${id} does not exists`);
        }
    } else {
        throw new Error(`${ id } is not valid`);
    }
};



module.exports = {
    isValidRole,
    emailExists,
    userExistsById,
    existsCategory
}