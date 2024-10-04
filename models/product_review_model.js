const mongoose = require('mongoose');

const productReviewSchema = mongoose.Schema({
    userBuyerId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ProductReviewModel = mongoose.model("Product_Review", productReviewSchema);
module.exports = ProductReviewModel;
