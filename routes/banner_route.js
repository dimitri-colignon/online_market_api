const express = require('express');
const BannerModel = require('../models/banner_model');
const responseHttp = require('../tools/http_tools');
const bannerRouter = express.Router();

// Insert
bannerRouter.post("/api/banner", async (req, res) => {
    try {
        const { image } = req.body;
        const banner = new BannerModel({ image });
        await banner.save();
        res.status(201).send(banner);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete
bannerRouter.delete("/api/banner/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await BannerModel.findByIdAndDelete(id);
        res.status(201).send(banner);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Query
bannerRouter.get("/api/banners", async (req, res) => {
    try {
        const banners = await BannerModel.find();
        responseHttp(banners, res, "Banners not found!");
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = bannerRouter;