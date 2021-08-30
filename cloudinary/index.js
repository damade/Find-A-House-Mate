const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: "kadick-integrated-limited",
  api_key: "718221826144732",
  api_secret: "1MC8Lou_inwTjIO6_rb8elghXhY",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "FindAHouseMate",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

module.exports = { cloudinary, storage };
