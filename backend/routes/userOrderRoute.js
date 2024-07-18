const express = require('express');
const route = express.Router();
const { auth } = require('../middleware/authMiddleware');
const controller = require('../controllers/userOrderController');

//User orders
route.get('/', auth, controller.getMyOrders);
route.get('/:id', auth, controller.getMyOrderById);

module.exports = route;