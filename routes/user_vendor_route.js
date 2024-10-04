const express = require('express');
const UserVendorModel = require('../models/user_vendor_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userVendorRouter = express.Router();

// Signup api endpoint
userVendorRouter.post("/api/user/vendor/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingEmail = await UserVendorModel.findOne({ email });
        if (existingEmail) {
            res.status(400).json({ msg: "Vendor user with same email already exist!" });
        } else {
            // Generate a salt with a cost factor of 10.
            const salt = await bcrypt.genSalt(10);
            // Hash the password using the generated salt.
            const hashedPassword = await bcrypt.hash(password, salt);
            let userVendor = new UserVendorModel({ fullName, email, password: hashedPassword });
            await userVendor.save();
            res.status(201).send(userVendor);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Signin api endpoint
userVendorRouter.post("/api/user/vendor/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const findVendor = await UserVendorModel.findOne({ email });
        if (!findVendor) {
            res.status(400).json({ msg: "Vendor user not found with this email!" });
        } else {
            const isMatch = await bcrypt.compare(password, findVendor.password);
            if (!isMatch) {
                res.status(400).json({ msg: "Incorrect password!" });
            } else {
                const token = jwt.sign({ id: findVendor._id }, "passwordKey");
                // On enlève le password.
                const { password, ...userVendorWithoutPassword } = findVendor._doc;
                res.status(201).json({ token, userVendor: userVendorWithoutPassword });
            }
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = userVendorRouter;