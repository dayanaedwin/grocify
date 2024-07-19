const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'User already exists.' })
        }

        password = await bcrypt.hash(password, 12);
        user = new User({ name, email, password });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const SECRET = process.env.SECRET;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET, {
            expiresIn: '5h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }

}

exports.getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('name email roles address');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
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
        res.status(200).json({message: 'Password updated successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }    
}