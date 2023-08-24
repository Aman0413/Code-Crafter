const cloudnary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (image) => {
  try {
    const options = {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    };
    options.resource_type = "auto";
    return await cloudnary.uploader.upload(image, options);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
