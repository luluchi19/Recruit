"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authController = require("../controllers/auth.controller");
var router = express_1.Router();
router.get('/check', authController.check);
router.get('/logout', authController.logout);
exports["default"] = router;
