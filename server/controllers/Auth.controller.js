const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup Controller
exports.signup = async (req, res) => {
    try {
        // Get data
        const { firstName, lastName, email, password } = req.body;

        // Validate
        if (!email || !firstName || !lastName || !password) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user in the database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // Return response
        return res.status(201).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        // Get data
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Credential(s) missing",
            });
        }

        // Find user with given email
        const user = await User.findOne({ email }).populate('uploadedURLS');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare password and generate token
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            // Save token to user document in the database
            user.token = token;
            await user.save();

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User login success",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again.",
        });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetail = await User.findById(userId).populate('uploadedURLS');

        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // console.log("User details are", userDetail);
        return res.status(200).json({
            success: true,
            userDetail,
            message: "User profile retrieved successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve user profile. Please try again.",
        });
    }
};