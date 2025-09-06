"use strict";
exports.__esModule = true;
exports.loginPost = exports.registerPost = void 0;
var joi_1 = require("joi");
exports.registerPost = function (req, res, next) {
    var schema = joi_1["default"].object({
        fullName: joi_1["default"].string()
            .required()
            .min(5)
            .max(50)
            .messages({
            "string.empty": "Vui lòng nhập họ tên!",
            "string.min": "Họ tên phải có ít nhất 5 ký tự!",
            "string.max": "Họ tên không được vượt quá 50 ký tự!"
        }),
        email: joi_1["default"].string()
            .required()
            .email()
            .messages({
            "string.empty": "Vui lòng nhập email của bạn!",
            "string.email": "Email không đúng định dạng!"
        }),
        password: joi_1["default"].string()
            .required()
            .min(8) // Ít nhất 8 ký tự
            .custom(function (value, helpers) {
            if (!/[A-Z]/.test(value)) {
                return helpers.error("password.uppercase"); // Ít nhất một chữ cái in hoa
            }
            if (!/[a-z]/.test(value)) {
                return helpers.error("password.lowercase"); // Ít nhất một chữ cái thường
            }
            if (!/\d/.test(value)) {
                return helpers.error("password.number"); // Ít nhất một chữ số
            }
            if (!/[@$!%*?&]/.test(value)) {
                return helpers.error("password.special"); // Ít nhất một ký tự đặc biệt
            }
            return value; // Nếu tất cả điều kiện đều đúng
        })
            .messages({
            "string.empty": "Vui lòng nhập mật khẩu!",
            "string.min": "Mật khẩu phải chứa ít nhất 8 ký tự!",
            "password.uppercase": "Mật khẩu phải chứa ít nhất một chữ cái in hoa!",
            "password.lowercase": "Mật khẩu phải chứa ít nhất một chữ cái thường!",
            "password.number": "Mật khẩu phải chứa ít nhất một chữ số!",
            "password.special": "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!"
        })
    });
    var error = schema.validate(req.body).error;
    if (error) {
        var errorMessage = error.details[0].message;
        res.json({
            code: "error",
            message: errorMessage
        });
        return;
    }
    next();
};
exports.loginPost = function (req, res, next) {
    var schema = joi_1["default"].object({
        email: joi_1["default"].string()
            .required()
            .email()
            .messages({
            "string.empty": "Vui lòng nhập email của bạn!",
            "string.email": "Email không đúng định dạng!"
        }),
        password: joi_1["default"].string()
            .required()
            .min(8) // Ít nhất 8 ký tự
            .custom(function (value, helpers) {
            if (!/[A-Z]/.test(value)) {
                return helpers.error("password.uppercase"); // Ít nhất một chữ cái in hoa
            }
            if (!/[a-z]/.test(value)) {
                return helpers.error("password.lowercase"); // Ít nhất một chữ cái thường
            }
            if (!/\d/.test(value)) {
                return helpers.error("password.number"); // Ít nhất một chữ số
            }
            if (!/[@$!%*?&]/.test(value)) {
                return helpers.error("password.special"); // Ít nhất một ký tự đặc biệt
            }
            return value; // Nếu tất cả điều kiện đều đúng
        })
            .messages({
            "string.empty": "Vui lòng nhập mật khẩu!",
            "string.min": "Mật khẩu phải chứa ít nhất 8 ký tự!",
            "password.uppercase": "Mật khẩu phải chứa ít nhất một chữ cái in hoa!",
            "password.lowercase": "Mật khẩu phải chứa ít nhất một chữ cái thường!",
            "password.number": "Mật khẩu phải chứa ít nhất một chữ số!",
            "password.special": "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!"
        })
    });
    var error = schema.validate(req.body).error;
    if (error) {
        var errorMessage = error.details[0].message;
        res.json({
            code: "error",
            message: errorMessage
        });
        return;
    }
    next();
};
