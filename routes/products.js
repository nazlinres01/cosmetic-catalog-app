// routes/products.js
const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Tüm ürünleri listeleyen GET endpointi
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Yeni bir ürün ekleyen POST endpointi
router.post('/', async (req, res, next) => {
  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Bir ürünü güncelleyen PUT endpointi
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.category = req.body.category || product.category;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Bir ürünü silen DELETE endpointi
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
