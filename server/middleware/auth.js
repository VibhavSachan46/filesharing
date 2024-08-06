const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User.model");

exports.auth = async (req, res, next) => {
    try {
        // console.log("Middleware started");
        

        // Extract token
        const token = req.header("Authorization").replace("Bearer ", "");
        // console.log("Token received in middleware:", token);


        

        // If token missing, return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode; // Attach the decoded token to req.user
            next(); // Proceed to the next middleware/controller
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
        // console.log("Middleware completed");
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};
