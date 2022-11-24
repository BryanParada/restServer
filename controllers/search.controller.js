const { response } = require("express");
const { User } = require("../models");
const { ObjectId } = require('mongoose').Types;

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async(term = '', res = response) => {

    const isMongoID = ObjectId.isValid( term ); //true

    if (isMongoID) {
        const user = await User.findById( term );
        return res.json({
            results: (user) ? [user] : [] 
        })
    }

}


const search = (req, res = response) =>{
 
    const {collection, term} = req.params;

    if (!allowedCollections.includes( collection )){
        return res.status(400).json({
            msg: `Collection not found`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res)
        break;
        case 'categories':

        break;
        case 'products':

        break;

        default:
            res.status(500).json({
                msg: 'You forgot to make this search'
            })
    }

    // res.json({
    //     msg: 'Search...',
    //     collection,
    //     term
    // })
}

module.exports = {
    search
}