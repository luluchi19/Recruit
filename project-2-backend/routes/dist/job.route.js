"use strict";
exports.__esModule = true;
var express_1 = require("express");
var jobController = require("../controllers/job.controller");
var multer_1 = require("multer");
var cloudinary_helper_1 = require("../helpers/cloudinary.helper");
var jobValidate = require("../validates/job.validate");
var router = express_1.Router();
var upload = multer_1["default"]({
    storage: cloudinary_helper_1.storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'application/pdf') {
            cb(null, false);
            return;
        }
        cb(null, true);
    }
});
router.get('/detail/:id', jobController.detail);
router.post('/apply', upload.single("fileCV"), jobValidate.applyPost, jobController.applyPost);
exports["default"] = router;
