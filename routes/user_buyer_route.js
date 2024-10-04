const express = require('express');
const UserBuyerModel = require('../models/user_buyer_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userBuyerRouter = express.Router();

// Signup
userBuyerRouter.post("/api/user/buyer/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingEmail = await UserBuyerModel.findOne({ email });
        if (existingEmail) {
            res.status(400).json({ msg: "Buyer user with same email already exist!" });
        } else {
            // Generate a salt with a cost factor of 10.
            const salt = await bcrypt.genSalt(10);
            // Hash the password with the generated salt.
            const hashedPassword = await bcrypt.hash(password, salt);
            let user = new UserBuyerModel({ fullName, email, password: hashedPassword });
            await user.save();
            res.status(201).send(user);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Signin
userBuyerRouter.post("/api/user/buyer/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await UserBuyerModel.findOne({ email });
        if (!findUser) {
            res.status(400).json({ msg: "Buyer user not found with this email!" });
        } else {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) {
                res.status(400).json({ msg: "Incorrect password!" });
            } else {
                const token = jwt.sign({ id: findUser._id }, "passwordKey");
                // On enlève le password.
                const { password, ...userBuyerWithoutPassword } = findUser._doc;
                res.status(201).json({ token, userBuyer: userBuyerWithoutPassword });
            }
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = userBuyerRouter;
