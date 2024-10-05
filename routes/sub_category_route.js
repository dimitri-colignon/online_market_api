const express = require('express');
const SubCategoryModel = require('../models/sub_category_model');
const responseHttp = require('../tools/http_tools');
const subCategoryRouter = express.Router();

// Insert
subCategoryRouter.post("/api/subcategory", async (req, res) => {
    try {
        const { name, image, actived, categoryId } = req.body;
        const subCategory = new SubCategoryModel({ name, image, actived, categoryId })
        await subCategory.save();
        res.status(201).send(subCategory);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update
subCategoryRouter.put("/api/subcategory/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, actived, categoryId } = req.body;
        const subCategory = await SubCategoryModel.findByIdAndUpdate(id, { name, image, actived, categoryId }, { new: true });
        res.status(201).send(subCategory);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete
// !!! Effacer aussi les products associés.
// subCategoryRouter.delete("/api/subcategory/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const subCategory = await SubCategoryModel.findByIdAndDelete(id);
//         res.status(201).send(subCategory);
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// });

// Query
subCategoryRouter.get("/api/subcategories", async (req, res) => {
    try {
        const subCategories = await SubCategoryModel.find();
        responseHttp(subCategories, res, "Subcategories all categories not found!");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

subCategoryRouter.get("/api/subcategories/actived/:actived", async (req, res) => {
    try {
        const { actived } = req.params;
        const subCategories = await SubCategoryModel.find({ actived: actived });
        responseHttp(subCategories, res, `Subcategories all categories by actived (${actived}) not found!`);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

subCategoryRouter.get("/api/subcategories/:categoryId", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subCategories = await SubCategoryModel.find({ categoryId: categoryId });
        responseHttp(subCategories, res, "Subcategories by id not found!");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

subCategoryRouter.get("/api/subcategories/:categoryId/actived/:actived", async (req, res) => {
    try {
        const { categoryId, actived } = req.params;
        const subCategories = await SubCategoryModel.find({ categoryId: categoryId, actived: actived });
        responseHttp(subCategories, res, `Subcategories by category id, actived (${actived}) not found!`);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = subCategoryRouter;