const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('name email roles addresses');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const newUser = new User(req.body);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.updateOne(newUser);
        res.status(200).json({ message: 'User data updated successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateUserPassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(200).json({ error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Incorrect current password' });
        }

        const password = await bcrypt.hash(newPassword, 12);
        await user.updateOne({ password });
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}