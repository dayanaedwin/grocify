const express = require('express');
const route = express.Router();

const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
// const orderRoute = require('./orderRoute');

route.use('/user', userRoute);
route.use('/product', productRoute);
// route.use('/order', orderRoute);

module.exports = route;