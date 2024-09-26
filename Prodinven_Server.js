const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 27017; // or any port you prefer

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/coffeeShopInventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// MongoDB Schema
const productSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    type: String,
    description: String,
    stock: Number,
    price: String
});

const Product = mongoose.model('Product', productSchema);

// API to get products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// API to add a product
app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
