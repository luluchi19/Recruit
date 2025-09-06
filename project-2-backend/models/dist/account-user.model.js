"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1["default"].Schema({
    fullName: String,
    email: String,
    password: String,
    avatar: String,
    phone: String
}, {
    timestamps: true
});
var AccountUser = mongoose_1["default"].model('AccountUser', schema, "accounts-user");
exports["default"] = AccountUser;
