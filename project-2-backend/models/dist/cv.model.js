"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1["default"].Schema({
    jobId: String,
    fullName: String,
    email: String,
    phone: String,
    fileCV: String,
    viewed: {
        type: Boolean,
        "default": false
    },
    status: {
        type: String,
        "default": "initial"
    }
}, {
    timestamps: true
});
var CV = mongoose_1["default"].model('CV', schema, "cvs");
exports["default"] = CV;
