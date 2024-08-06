const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    console.log("file is ", file);
    
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    console.log("Starting to uplaod");
    
    return await cloudinary.uploader.upload(file.tempFilePath, options);
} 