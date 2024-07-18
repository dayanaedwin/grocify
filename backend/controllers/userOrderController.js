const { Order } = require('../models');
const { Product } = require('../models');
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
        if (!orders || orders.length < 1) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createUserOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.userId;
        const { products, deliveryAddress } = req.body;

        if (!products || products.length === 0) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Products are required' });
        }
        if (!deliveryAddress) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Address is required' });
        }

        for (let product of products) {
            const productInDB = await Product.findById(product.productId);
            if (!productInDB) {
                await session.abortTransaction();
                return res.status(404).json({ error: 'Product not found' });
            }
            if (productInDB.stock < product.quantity) {
                await session.abortTransaction();
                return res.status(400).json({ error: `Insufficient stock for product: ${productInDB.name}` });
            }

            product.price = productInDB.price;
            product.currency = productInDB.currency;

            productInDB.stock -= product.quantity;
            await productInDB.save({ session });
        }

        const totalPrice = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const newOrder = new Order({ userId, products, totalPrice, deliveryAddress });
        const createdOrder = await newOrder.save({ session });

        if (!createdOrder) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Failed to create new order' });
        }

        await session.commitTransaction();
        res.status(200).json({ message: 'Order created successfully' });

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        session.endSession();
    }
}