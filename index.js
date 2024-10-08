const express = require('express');

const userBuyerRouter = require('./routes/user_buyer_route');
const userVendorRouter = require('./routes/user_vendor_route');
const bannerRouter = require('./routes/banner_route');
const categoryRouter = require('./routes/category_route');
const subCategoryRouter = require('./routes/sub_category_route');
const productRouter = require('./routes/product_route');
const productReviewRouter = require('./routes/product_review_route');
const orderRouter = require('./routes/order_route');

const cors = require('cors');

const connectDB = require('./tools/db_tools');

const app = express();

app.use(express.json());
app.use(cors());
app.use(userBuyerRouter);
app.use(userVendorRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(productReviewRouter);
app.use(orderRouter);

// ***
// Connection à MongoDB:
// Changer <user>, <password> et <cluster-url> par vos identifiants.
// await mongoose.connect("mongodb+srv://<user>:<password>@<cluster-url>").then(console.log("MongoDb is connected!"));
connectDB();
// ***

const port = 3000;
app.listen(port, "0.0.0.0", function () {
   console.log(`Server is running on port ${port}!`);
});