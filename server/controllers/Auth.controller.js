const User = require("../models/User.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        // GET data
        console.log("STarted")
        const { firstName, lastName, email, password } = req.body

        console.log("email is", email)

        // Validate
        if (!email, !firstName, !lastName, !password) {
            return res.status(403).send({
                success: false,
                message: "All fields required"
            })
        }

        // Check if user already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(402).json({
                success: false,
                message: "User already exists"
            })
        }

        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10)

        //create And enter user in database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // return response
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
}


exports.login = async (req, res) => {
    try {
        // Get Data
        const { email, password } = req.body
        console.log("email is ",email, "Passowrd is",password)

        // Validation (check if email and password are present or not )
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "credential(s) missing"
            })
        }

        // Find user with given email
        const user = await User.findOne({ email }).populate('uploadedURLS')

        // Compare password from database if correct generate Token

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24"
                }
            )

            // Save token to user document in database
            User.token = token
            user.databse = undefined

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        } else {
            return res.status(401).json({
                succss: false,
                message: "Password is incorrect"
            })
        }

    } catch (error) {
        console.error(error);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }


}