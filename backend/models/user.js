const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        default: ['user'], // Other roles can be 'admin', 'vendor'.
    },
    addresse: {
        street: String,
        city: String,
        state: String,
        pincode: Number,
        country: String,
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;