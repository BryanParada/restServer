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
        //TAMBIEN!! se puede colocar
        //const user = await User.find({ _id: term, status: true });
        //asi nos evitamos el filtro and de abajo
        const user = await User.findById( term );
        return res.json({
            results: (user) ? [user] : [] 
        })
    }

    const regex = new RegExp( term, 'i');
    const query = {  
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}] 
    }

    // const users = await User.find({ 
    //     //$or: [{name: regex, status: true}, {email: regex, status: true}]
    //     $or: [{name: regex}, {email: regex}],
    //     $and: [{status: true}] 
    //  });

    const [total, users] = await Promise.all([
        User.count(query),
        User.find(query)
    ])


    res.json({
        total,
        results: users
    })

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