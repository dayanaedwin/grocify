const express = require('express');
const route = express.Router();

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const userOrderRoute = require('./userOrderRoute');
const cartRoute = require('./cartRoute');

route.get('/api', (req, res) => {
    res.json({ message: 'This is an endpoint!' });
});

route.use('/auth', authRoute);
route.use('/user', userRoute);
route.use('/product', productRoute);
route.use('/my-order', userOrderRoute);
route.use('/cart', cartRoute);

module.exports = route;