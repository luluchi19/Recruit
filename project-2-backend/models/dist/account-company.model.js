"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1["default"].Schema({
    companyName: String,
    email: String,
    password: String,
    city: String,
    address: String,
    companyModel: String,
    companyEmployees: String,
    workingTime: String,
    workOvertime: String,
    description: String,
    logo: String,
    phone: String
}, {
    timestamps: true
});
var AccountCompany = mongoose_1["default"].model('AccountCompany', schema, "accounts-company");
exports["default"] = AccountCompany;
