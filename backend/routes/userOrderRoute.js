const express = require('express');
const route = express.Router();
const { auth } = require('../middleware/authMiddleware');
const controller = require('../controllers/userOrderController');

route.get('/', auth, controller.getMyOrders);
route.get('/:id', auth, controller.getMyOrderById);

route.post('/', auth, controller.createUserOrder);
route.put('/:orderId', auth, controller.updateUserOrder);

// route.get('/filter', auth, controller.filterUserOrders);

module.exports = route;