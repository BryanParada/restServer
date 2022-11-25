const {Router} = require('express');
const { check } = require('express-validator'); 
const { loadFile } = require('../controllers/upload.controller');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
 
 
const router = Router();

router.post('/', [], loadFile);
 

module.exports = router;