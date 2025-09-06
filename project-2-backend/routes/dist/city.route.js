"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cityController = require("../controllers/city.controller");
var router = express_1.Router();
router.get('/list', cityController.list);
exports["default"] = router;
