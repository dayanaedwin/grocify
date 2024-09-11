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
        enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'placed'
    },
    deliveryAddress: {
        name: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        country: String,
        pincode: Number,
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