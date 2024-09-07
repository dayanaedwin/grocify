const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
            },
            currency: {
                type: String,
                required: true
            },
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        pincode: Number,
        country: String,
    },
    paymentMode: {
        type: String,
    },
    paymentStatus: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed', 'failed'],
    }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;