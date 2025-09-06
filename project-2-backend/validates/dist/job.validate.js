"use strict";
exports.__esModule = true;
exports.applyPost = void 0;
var joi_1 = require("joi");
exports.applyPost = function (req, res, next) {
    var schema = joi_1["default"].object({
        jobId: joi_1["default"].string()
            .required()
            .messages({
            "string.empty": "Không tìm thấy công việc này!"
        }),
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
            "string.empty": "Vui lòng nhập email!",
            "string.email": "Email không đúng định dạng!"
        }),
        phone: joi_1["default"].string()
            .required()
            .custom(function (value, helpers) {
            if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
                return helpers.error("phone.invalid"); // Định dạng số điện thoại Việt Nam
            }
            return value;
        })
            .messages({
            "string.empty": "Vui lòng nhập số điện thoại!",
            "phone.invalid": "Số điện thoại không đúng định dạng!"
        }),
        fileCV: joi_1["default"].string().allow('')
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
