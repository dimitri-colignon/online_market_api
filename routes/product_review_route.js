const express = require('express');
const ProductReviewModel = require('../models/product_review_model');
const responseHttp = require('../tools/http_tools');
const productReviewRouter = express.Router();

// Insert
productReviewRouter.post("/api/product-review", async (req, res) => {
    try {
        const { userBuyerId, email, fullName, productId, rating, review } = req.body;
        const productReview = new ProductReviewModel({ userBuyerId, email, fullName, productId, rating, review });
        await productReview.save();
        res.status(201).send(productReview);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Query
productReviewRouter.get("/api/product-reviews", async (req, res) => {
    try {
        const productReviews = await ProductReviewModel.find();
        responseHttp(productReviews, res, "Product reviews not found!");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = productReviewRouter;
