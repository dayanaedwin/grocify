const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    price: {
        type: Number,
        required: true,
    },
    uom: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    seller: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;