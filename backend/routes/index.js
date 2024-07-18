const express = require('express');
const route = express.Router();

const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const userOrderRoute = require('./userOrderRoute');

route.use('/user', userRoute);
route.use('/product', productRoute);
route.use('/my-order', userOrderRoute);

module.exports = route;