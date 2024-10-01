const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    actived: {
        type: Boolean,
        default: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);
module.exports = subCategoryModel;
