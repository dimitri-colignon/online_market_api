const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const BannerModel = mongoose.model("Banner", bannerSchema);
module.exports = BannerModel;