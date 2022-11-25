const {Router} = require('express');
const { check } = require('express-validator'); 
const { loadFile, updateImage } = require('../controllers/upload.controller');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const {allowedCollection} = require('../helpers/db-validators')
 
 
const router = Router();

router.post('/', [], loadFile);

router.put('/:collection/:id', [
    check('id', 'Id must be a valid MongoID').isMongoId(),
    check('collection').custom( c => allowedCollection( c , ['users','products'])),
    validateFields
], updateImage);
 

module.exports = router;