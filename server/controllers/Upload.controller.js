require("dotenv").config();
const File = require("../models/File.model");
const User = require("../models/User.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { uploadImageToCloudinary } = require("../utils/cloudinary.util");

const convertBytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2); // Convert and round to 2 decimal places
};

exports.upload = async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.files && req.files.file;
        const title = req.body.title;

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }
        if (!title) {
            return res.status(404).json({
                success: false,
                message: "Title not found"
            });
        }

        const fileToBeUploaded = await uploadImageToCloudinary(
            file,
            process.env.FOLDER_NAME
        );

        const fileSizeInMB = convertBytesToMB(fileToBeUploaded.bytes);

        const newPost = await File.create({
            name: title,
            url: fileToBeUploaded.secure_url,
            size: fileSizeInMB,
            Author: userId,
            fileType: file.mimetype
        });

        await User.findByIdAndUpdate(userId, { $push: { uploadedURLS: newPost._id } });

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to upload file",
        });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const userId = req.user.id;
        const fileId = req.params.id;

        // Find the file by ID
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found",
            });
        }

        // Extract the public_id from the Cloudinary URL
        const urlParts = file.url.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];

        // Delete the file from Cloudinary
        await cloudinary.uploader.destroy(`${process.env.FOLDER_NAME}/${publicId}`);

        // Delete the file from the database
        await File.findByIdAndDelete(fileId);

        // Update the user document to remove the file reference
        await User.findByIdAndUpdate(userId, { $pull: { uploadedURLS: fileId } });

        res.status(200).json({
            success: true,
            message: "File deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete file",
        });
    }
};
