const express = require('express');
const OrderModel = require('../models/order_model');
const responseHttp = require('../tools/http_tools');
const orderRouter = express.Router();

// Insert
orderRouter.post("/api/order", async (req, res) => {
    try {
        const { buyerId, buyerFullName, buyerEmail, buyerState, buyerCity, buyerLocality, categoryId, subCategoryId, productId, productName, productFullName, productPrice, productFirstImage, vendorId, cartQuantity } = req.body;
        const order = new OrderModel({ buyerId, buyerFullName, buyerEmail, buyerState, buyerCity, buyerLocality, categoryId, subCategoryId, productId, productName, productFullName, productPrice, productFirstImage, vendorId, cartQuantity });
        await order.save();
        res.status(201).send(order);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Query
orderRouter.get("/api/orders/buyerId/:buyerId", async (req, res) => {
    try {
        const { buyerId } = req.params;
        const orders = await OrderModel.find({ buyerId: buyerId });
        responseHttp(orders, res, "Orders not found for this buyer!");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = orderRouter;