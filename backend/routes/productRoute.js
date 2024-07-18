const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const controller = require('../controllers/productController');

router.get('/', auth, controller.getAllProducts);
router.get('/:id', auth, controller.getProductById);

router.post('/', controller.createNewProduct);
router.delete('/:id', controller.deleteProduct);
router.put('/:id', controller.updateProduct);

router.get('/sort/:field/:order', controller.sortByField);

module.exports = router;
