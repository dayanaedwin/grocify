const { Product } = require('../models');

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }

}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createNewProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to create new product' })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({ _id: id });
        res.status(200).json({ error: 'Failed to delete the product' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete product' })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.updateOne({ _id: id }, { $set: req.body });
        res.status(200).json({ message: 'The product details have been updated' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update product details' });
    }
}

exports.sortByField = async (req, res) => {
    try {
        const { field, order } = req.params;

        if (!Product.schema.path(field)) {
            return res.status(400).json({ error: 'Invalid field name' });
        }

        const products = await Product.find().sort({ [field]: (order === 'asc' ? 1 : -1) });

        res.status(200).json({ data: products });
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve the products' });

    }

}