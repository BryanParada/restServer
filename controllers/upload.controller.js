const { response } = require("express");


const loadFile = (req, res = response) => {

res.json({
    msg: 'loadfile!'
})


}


module.exports = {
    loadFile
}