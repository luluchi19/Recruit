"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenCompany = exports.verifyTokenUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_user_model_1 = __importDefault(require("../models/account-user.model"));
const account_company_model_1 = __importDefault(require("../models/account-company.model"));
const verifyTokenUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.json({
                code: "error",
                message: "Vui lòng gửi kèm theo token!"
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`); // Giải mã token
        const { id, email } = decoded;
        const existAccount = yield account_user_model_1.default.findOne({
            _id: id,
            email: email
        });
        if (!existAccount) {
            res.clearCookie("token");
            res.json({
                code: "error",
                message: "Token không hợp lệ!"
            });
            return;
        }
        req.account = existAccount; // do req định nghĩa sẵn các trường rồi nên ta thêm interface có account? để tránh lỗi
        next();
    }
    catch (error) {
        res.clearCookie("token");
        res.json({
            code: "error",
            message: "Token không hợp lệ!"
        });
    }
});
exports.verifyTokenUser = verifyTokenUser;
const verifyTokenCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.json({
                code: "error",
                message: "Vui lòng gửi kèm theo token!"
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`); // Giải mã token
        const { id, email } = decoded;
        const existAccount = yield account_company_model_1.default.findOne({
            _id: id,
            email: email
        });
        if (!existAccount) {
            res.clearCookie("token");
            res.json({
                code: "error",
                message: "Token không hợp lệ!"
            });
            return;
        }
        req.account = existAccount;
        next();
    }
    catch (error) {
        res.clearCookie("token");
        res.json({
            code: "error",
            message: "Token không hợp lệ!"
        });
    }
});
exports.verifyTokenCompany = verifyTokenCompany;
