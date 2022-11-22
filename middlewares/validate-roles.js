const { request, response } = require("express")

const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Must verify token before the role verification'
        })
    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} is not administrator - You are not allowed.`
        })
    }

    next();


}

module.exports = { isAdminRole }