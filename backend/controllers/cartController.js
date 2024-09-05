const { Product, Cart } = require('../models');
const mongoose = require('mongoose');

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.userId;

        const cartItems = await Cart.find({ userId }).populate('productId').lean();

        if (!cartItems || cartItems.length < 1) {
            return res.status(200).json({ data: [] });
        }

        const formattedCartItems = cartItems.map(item => {
            return {
                _id: item._id,
                productDetails: item.productId,
                quantity: item.quantity,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }
        });

        res.status(200).json(formattedCartItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get cart items' })
    }
}

exports.addToCart = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Invalid product or quantity' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.stock < quantity) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Out of stock' });
        }

        let cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await Cart.updateOne({ _id: cartItem._id }, { $set: cartItem }, { session });
        } else {
            cartItem = new Cart({ userId, productId, quantity });
            await cartItem.save({ session });
        }

        await session.commitTransaction();
        res.status(200).json({ message: 'Items added to the cart' });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: 'Failed to add items to cart' });
    } finally {
        session.endSession();
    }
}

exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { id, quantity } = req.body;

        if (quantity === undefined || quantity < 0) {
            return res.status(400).json({ error: 'Quantity is invalid or negative' });
        }

        const cartItem = await Cart.findOne({ userId, _id: id });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' })
        }

        if (quantity === 0) { // If the quantity is 0, remove the item from the cart        
            await Cart.deleteOne({ _id: id });
            return res.status(200).json({ message: 'Cart item removed' });
        } else {
            cartItem.quantity = quantity;
            await Cart.updateOne({ _id: id }, { $set: cartItem });
            return res.status(200).json({ message: 'Cart item updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the cart' });
    }
}

exports.deleteCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const id = req.params.id;

        const cartItem = await Cart.findOne({ userId, _id: id });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        await Cart.deleteOne({ _id: id });

        res.status(200).json({ message: 'Cart item removed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the cart item' });
    }
}