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
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        default: ['user'], // Other roles can be 'admin', 'vendor'.
    },
    addresses: [
        {
            name: {
                type: String
            },
            phone: {
                type: Number
            },
            building: {
                type: String
            },
            street: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            pincode: {
                type: Number
            },
            country: {
                type: String
            },
            isDefault: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;