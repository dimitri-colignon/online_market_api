const express = require('express');
const CategoryModel = require('../models/category_model');
const responseHttp = require('../tools/http_tools');
const categoryRouter = express.Router();

// Insert
categoryRouter.post("/api/category", async (req, res) => {
    try {
        const { name, image, actived } = req.body;
        const category = new CategoryModel({ name, image, actived });
        await category.save();
        res.status(201).send(category);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update
categoryRouter.put("/api/category/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, actived } = req.body;
        const category = await CategoryModel.findByIdAndUpdate(id, { name, image, actived }, { new: true });
        res.status(201).send(category);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete
// !!! Effacer aussi les subCategories et products associés.
// categoryRouter.delete("/api/category/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const category = await CategoryModel.findByIdAndDelete(id);
//         res.status(201).send(category);
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// });

// Query
categoryRouter.get("/api/categories", async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        responseHttp(categories, res, "Categories not found!");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

categoryRouter.get("/api/categories/actived/:actived", async (req, res) => {
    try {
        const { actived } = req.params;
        const categories = await CategoryModel.find({ actived: actived });
        responseHttp(categories, res, `Categories by actived (${actived}) not found!`);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = categoryRouter;
