"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1["default"].Schema({
    name: String
});
var City = mongoose_1["default"].model('City', schema, "cities");
exports["default"] = City;
