"use strict";
exports.__esModule = true;
exports.storage = void 0;
var cloudinary_1 = require("cloudinary");
var multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
// Cấu hình Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Tạo cấu hình lưu trữ trên Cloudinary
exports.storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2
});
