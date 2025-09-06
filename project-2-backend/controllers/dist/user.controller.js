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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.detailCV = exports.listCV = exports.profilePatch = exports.loginPost = exports.registerPost = void 0;
var account_user_model_1 = require("../models/account-user.model");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var cv_model_1 = require("../models/cv.model");
var job_model_1 = require("../models/job.model");
var account_company_model_1 = require("../models/account-company.model");
exports.registerPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, email, password, existAccount, salt, hashedPassword, newAccount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, fullName = _a.fullName, email = _a.email, password = _a.password;
                return [4 /*yield*/, account_user_model_1["default"].findOne({
                        email: email
                    })];
            case 1:
                existAccount = _b.sent();
                if (existAccount) {
                    res.json({
                        code: "error",
                        message: "Email đã tồn tại trong hệ thống!"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1["default"].genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, salt)];
            case 3:
                hashedPassword = _b.sent();
                newAccount = new account_user_model_1["default"]({
                    fullName: fullName,
                    email: email,
                    password: hashedPassword
                });
                return [4 /*yield*/, newAccount.save()];
            case 4:
                _b.sent();
                res.json({
                    code: "success",
                    message: "Đăng ký tài khoản thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.loginPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existAccount, isPasswordValid, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, account_user_model_1["default"].findOne({
                        email: email
                    })];
            case 1:
                existAccount = _b.sent();
                if (!existAccount) {
                    res.json({
                        code: "error",
                        message: "Email không tồn tại trong hệ thống!"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, "" + existAccount.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    res.json({
                        code: "error",
                        message: "Mật khẩu không đúng!"
                    });
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1["default"].sign({
                    id: existAccount.id,
                    email: existAccount.email
                }, "" + process.env.JWT_SECRET, {
                    expiresIn: '1d' // Token có thời hạn 1 ngày
                });
                // Lưu token vào cookie
                res.cookie("token", token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production" ? true : false,
                    sameSite: "lax" // Cho phép gửi cookie giữa các domain
                });
                res.json({
                    code: "success",
                    message: "Đăng nhập thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.profilePatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.file) {
                    req.body.avatar = req.file.path;
                }
                else {
                    delete req.body.avatar; // nếu không có file thì xóa trường avatar trong req.body
                }
                return [4 /*yield*/, account_user_model_1["default"].updateOne({
                        _id: req.account.id
                    }, req.body)];
            case 1:
                _a.sent();
                res.json({
                    code: "success",
                    message: "Cập nhật thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.listCV = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, listCV, dataFinal, _i, listCV_1, item, dataItemFinal, infoJob, infoCompany;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userEmail = req.account.email;
                return [4 /*yield*/, cv_model_1["default"]
                        .find({
                        email: userEmail
                    })
                        .sort({
                        createdAt: "desc"
                    })];
            case 1:
                listCV = _a.sent();
                dataFinal = [];
                _i = 0, listCV_1 = listCV;
                _a.label = 2;
            case 2:
                if (!(_i < listCV_1.length)) return [3 /*break*/, 6];
                item = listCV_1[_i];
                dataItemFinal = {
                    id: item.id,
                    jobTitle: "",
                    companyName: "",
                    jobSalaryMin: 0,
                    jobSalaryMax: 0,
                    jobPosition: "",
                    jobWorkingForm: "",
                    status: item.status
                };
                return [4 /*yield*/, job_model_1["default"].findOne({
                        _id: item.jobId
                    })];
            case 3:
                infoJob = _a.sent();
                if (!infoJob) return [3 /*break*/, 5];
                dataItemFinal.jobTitle = "" + infoJob.title;
                dataItemFinal.jobSalaryMin = parseInt("" + infoJob.salaryMin);
                dataItemFinal.jobSalaryMax = parseInt("" + infoJob.salaryMax);
                dataItemFinal.jobPosition = "" + infoJob.position;
                dataItemFinal.jobWorkingForm = "" + infoJob.workingForm;
                return [4 /*yield*/, account_company_model_1["default"].findOne({
                        _id: infoJob.companyId
                    })];
            case 4:
                infoCompany = _a.sent();
                if (infoCompany) {
                    dataItemFinal.companyName = "" + infoCompany.companyName;
                    dataFinal.push(dataItemFinal);
                }
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                res.json({
                    code: "success",
                    message: "Lấy danh sách CV thành công!",
                    listCV: dataFinal
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detailCV = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cvId, infoCV, infoJob, dataFinalCV, dataFinalJob, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                cvId = req.params.id;
                return [4 /*yield*/, cv_model_1["default"].findOne({
                        _id: cvId
                    })];
            case 1:
                infoCV = _a.sent();
                if (!infoCV) {
                    res.json({
                        code: "error",
                        message: "Id không hợp lệ!"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, job_model_1["default"].findOne({
                        _id: infoCV.jobId
                    })];
            case 2:
                infoJob = _a.sent();
                if (!infoJob) {
                    res.json({
                        code: "error",
                        message: "Không có quyền truy cập!"
                    });
                    return [2 /*return*/];
                }
                dataFinalCV = {
                    fullName: infoCV.fullName,
                    email: infoCV.email,
                    phone: infoCV.phone,
                    fileCV: infoCV.fileCV
                };
                dataFinalJob = {
                    id: infoJob.id,
                    title: infoJob.title,
                    salaryMin: infoJob.salaryMin,
                    salaryMax: infoJob.salaryMax,
                    position: infoJob.position,
                    workingForm: infoJob.workingForm,
                    technologies: infoJob.technologies
                };
                console.log(dataFinalCV, dataFinalJob);
                res.json({
                    code: "success",
                    message: "Thành công!",
                    infoCV: dataFinalCV,
                    infoJob: dataFinalJob
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.json({
                    code: "error",
                    message: "Id không hợp lệ!"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
