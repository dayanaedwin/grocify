const { Product, Order } = require('../models');
const mongoose = require('mongoose');

exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId }).populate('products.productId', 'name description images price uom currency rating category stock seller').lean();

        if (!orders || orders.length < 1) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getMyOrderById = async (req, res) => {
    try {
        const userId = req.userId;
        const orderId = req.params.id;
        const orders = await Order.findOne({ _id: orderId, userId }).populate('products.productId', 'name description images price uom currency rating category stock seller').lean();;

        if (!orders || orders.length < 1) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const formattedOrders = {
            ...orders,
            products: orders.products.map(product => {
                return {
                    quantity: product.quantity,
                    price: product.price,
                    currency: product.currency,
                    productDetails: product.productId
                }
            })
        };
        res.status(200).send(formattedOrders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createUserOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.userId;
        const { products, deliveryAddress, paymentMode } = req.body;

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

        const newOrder = new Order({ userId, products, totalPrice, deliveryAddress, paymentMode });
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

exports.updateUserOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const orderId = req.params.orderId;
        const { deliveryAddress, orderStatus } = req.body;

        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ error: 'Order not found or does not belong to this user' });
        }

        // Check the status of the order to determine what can be updated
        if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
            return res.status(400).json({ error: `Order cannot be updated in its current status: ${order.status}` });
        }

        //Update the delivery address based on the order status
        if (deliveryAddress && ['pending', 'processing'].includes(order.status)) {
            order.deliveryAddress = deliveryAddress;
        }

        // Handle cancellation
        if (orderStatus && orderStatus === 'cancelled' && !['shipped', 'delivered', 'cancelled'].includes(order.status)) {
            order.status = 'cancelled';
        }

        await Order.updateOne({ _id: order._id }, { $set: order });

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the order details' });
    }
}