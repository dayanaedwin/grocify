const express = require('express');
const route = express.Router();
const { auth } = require('../middleware/authMiddleware');
const controller = require('../controllers/cartController');

route.get('/', auth, controller.getCartItems);
route.post('/', auth, controller.addToCart);
route.put('/', auth, controller.updateCartItem);
route.delete('/:id', auth, controller.deleteCartItem);

module.exports = route;