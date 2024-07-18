const { Order } = require('../models');
const mongoose = require('mongoose');

exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId });
        if (!orders || orders.length < 1) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getMyOrderById = async (req, res) => {
    try {
        const userId = req.userId;
        const orderId = req.params.id;
        const orders = await Order.find({ _id: orderId, userId });
        if(!orders || orders.length < 1) {
            return res.status(404).json({error: 'Order not found'});
        }
        res.status(200).json({data: orders});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
