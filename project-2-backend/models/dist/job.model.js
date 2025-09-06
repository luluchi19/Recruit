"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1["default"].Schema({
    companyId: String,
    title: String,
    salaryMin: Number,
    salaryMax: Number,
    position: String,
    workingForm: String,
    technologies: Array,
    description: String,
    images: Array
}, {
    timestamps: true
});
var Job = mongoose_1["default"].model('Job', schema, "jobs");
exports["default"] = Job;
