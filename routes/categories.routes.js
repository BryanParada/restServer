const {Router} = require('express');
const { check } = require('express-validator'); 

const { validateJWT, validateFields } = require('../middlewares');

const { createCategory } = require('../controllers/categories.controller');

const router = Router();
 
/**
 * {{url}}/api/categories
 */

// obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get');
    
})

// obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json('get - id');
    
})

// crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory )

// actualizar registro por id - privado - cualquier con token valido
router.put('/:id', (req, res) => {
    res.json('put');
    
})

// borrar una categoria - admin
router.delete('/:id', (req, res) => {
    res.json('delete');
    
})

module.exports = router;