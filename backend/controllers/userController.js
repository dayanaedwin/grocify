const { User } = require('../models');
const bcrypt = require('bcrypt');

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
        res.status(500).json({ error: 'registration failed' });
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
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' })
    }

}

exports.getCurrentUser = (req, res) => {

}

exports.updateUser = (req, res) => {

}

exports.deleteUser = (req, res) => {

}