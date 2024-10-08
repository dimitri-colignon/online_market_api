const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    buyerId: {
        type: String,
        required: true,
    },
    buyerFullName: {
        type: String,
        required: true,
    },
    buyerEmail: {
        type: String,
        required: true,
    },
    buyerState: {
        type: String,
        required: true,
    },
    buyerCity: {
        type: String,
        required: true,
    },
    buyerLocality: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    subCategoryId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productFullName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    productFirstImage: {
        type: String,
        required: true,
    },
    vendorId: {
        type: String,
        required: true,
    },
    cartQuantity: {
        type: Number,
        required: true,
    },
    orderProcessing: {
        type: Boolean,
        default: true,
    },
    orderDelivered: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
