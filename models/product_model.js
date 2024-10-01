const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    popular: {
        type: Boolean,
        default: false,
    },
    recommend: {
        type: Boolean,
        default: false,
    },
    actived: {
        type: Boolean,
        default: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    subCategoryId: {
        type: String,
        required: true,
    },
    vendorId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
