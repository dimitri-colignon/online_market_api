const express = require('express');
const ProductModel = require('../models/product_model');
const responseHttp = require('../tools/http_tools');
const productRouter = express.Router();

// Insert
productRouter.post("/api/product", async (req, res) => {
    try {
        const { name, price, quantity, description, images, actived, categoryId, subCategoryId, userVendorId } = req.body;
        const product = new ProductModel({ name, price, quantity, description, images, actived, categoryId, subCategoryId, userVendorId })
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
        const { name, price, quantity, description, images, popular, recommend, actived, categoryId, subCategoryId, userVendorId } = req.body;
        const product = await ProductModel.findByIdAndUpdate(id, { name, price, quantity, description, images, popular, recommend, actived, categoryId, subCategoryId, userVendorId }, { new: true });
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
productRouter.get("/api/products", async (req, res) => {
    try {
        const products = await ProductModel.find();
        responseHttp(products, res, "Products not found!");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

productRouter.get("/api/products/actived/:actived", async (req, res) => {
    try {
        const { actived } = req.params;
        const products = await ProductModel.find({ actived: actived });
        responseHttp(products, res, `Products by actived (${actived}) not found!`);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

productRouter.get("/api/products/:subcategoryId/actived/:actived", async (req, res) => {
    try {
        const { subCategoryId, actived } = req.params;
        const products = await ProductModel.find({ subCategoryId: subCategoryId, actived: actived });
        responseHttp(products, res, `Products by subcategory id, actived (${actived}) not found!`);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

productRouter.get("/api/products/popular", async (req, res) => {
    try {
        const products = await Product.find({ popular: true });
        responseHttp(products, res, "Products by popular not found!");
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

productRouter.get("/api/products/recommend", async (req, res) => {
    try {
        const products = await Product.find({ recommend: true });
        responseHttp(products, res, "Products by recommend not found!");
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

productRouter.get("/api/products/categoryId/:categoryId/popular", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ categoryId, popular: true });
        responseHttp(products, res, `Products by popular, categoryId (${categoryId}) not found!`);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = productRouter;