const mongoose = require("mongoose");

const fileURLSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    fileType: {
        type: String
    },
    size: {
        type: Number, // File size in MB
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("File", fileURLSchema);