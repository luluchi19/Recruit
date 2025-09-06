"use strict";
exports.__esModule = true;
var express_1 = require("express");
var searchController = require("../controllers/search.controller");
var router = express_1.Router();
router.get('/', searchController.search);
exports["default"] = router;
