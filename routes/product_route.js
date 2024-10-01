const express = require('express');
const ProductModel = require('../models/product_model');
const responseHttp = require('../tools/http_tools');
const productRouter = express.Router();

// Insert
productRouter.post("/api/product", async (req, res) => {
    try {
        const { name, price, quantity, description, images, actived, categoryId, subCategoryId, vendorId } = req.body;
        const product = new ProductModel({ name, price, quantity, description, images, actived, categoryId, subCategoryId, vendorId })
        await product.save();
        res.status(201).send(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update
productRouter.put("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity, description, images, popular, recommend, actived, categoryId, subCategoryId, vendorId } = req.body;
        const product = await ProductModel.findByIdAndUpdate(id, { name, price, quantity, description, images, popular, recommend, actived, categoryId, subCategoryId, vendorId }, { new: true });
        res.status(201).send(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete
// productRouter.delete("/api/product/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await ProductModel.findByIdAndDelete(id);
//         res.status(201).send(product);
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// });

// Query
productRouter.get("/api/products/", async (req, res) => {
    try {
        const products = await ProductModel.find();
        responseHttp(products, res, "Products not found!");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ***
// productRouter.get('/api/popular-products', async (req, res) => {
//     try {
//         const product = await Product.find({ popular: true });
//         if (!product || product.length == 0) {
//             return res.status(404).json({ msg: "products not found" });
//         } else {
//             return res.status(200).json(product);
//         }
//     } catch (e) {
//         res.status(500).json({ error: e.message })
//     }
// });

// productRouter.get('/api/recommended-products', async (req, res) => {
//     try {
//         const product = await Product.find({ recommend: true });
//         if (!product || product.length == 0) {
//             return res.status(404).json({ msg: "products not found" });
//         } else {
//             return res.status(200).json({ product });
//         }
//     } catch (e) {
//         res.status(500).json({ error: e.message })
//     }
// });

// productRouter.get('/api/products-by-category/:category', async (req, res) => {
//     try {
//         const { category } = req.params;
//         const products = await Product.find({ category, popular: true });
//         if (!products || products.length == 0) {
//             return res.status(404).json({ msg: "Product no found" });
//         } else {
//             return res.status(200).json(products);
//         }
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// });

module.exports = productRouter;