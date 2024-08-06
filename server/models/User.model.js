const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uploadedURLS: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    }],
    image: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
