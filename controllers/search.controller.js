const { response } = require("express");


const search = (req, res = response) =>{

    const {collection, term} = req.params;

    res.json({
        msg: 'Search.--',
        collection,
        term
    })
}

module.exports = {
    search
}