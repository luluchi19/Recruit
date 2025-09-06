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
exports.deleteCVDel = exports.changeStatusCVPatch = exports.detailCV = exports.listCV = exports.detail = exports.list = exports.deleteJobDel = exports.editJobPatch = exports.editJob = exports.listJob = exports.createJobPost = exports.profilePatch = exports.loginPost = exports.registerPost = void 0;
var bcryptjs_1 = require("bcryptjs");
var account_company_model_1 = require("../models/account-company.model");
var jsonwebtoken_1 = require("jsonwebtoken");
var job_model_1 = require("../models/job.model");
var city_model_1 = require("../models/city.model");
var cv_model_1 = require("../models/cv.model");
exports.registerPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyName, email, password, existAccount, salt, hashedPassword, newAccount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, companyName = _a.companyName, email = _a.email, password = _a.password;
                return [4 /*yield*/, account_company_model_1["default"].findOne({
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
                newAccount = new account_company_model_1["default"]({
                    companyName: companyName,
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
                return [4 /*yield*/, account_company_model_1["default"].findOne({
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
                token = jsonwebtoken_1["default"].sign(// sign: 3 tham số: payload: có thể là dạng chuỗi, object, buffer(file ảnh được chuyển thành buffer), secret: bí mật để mã hóa token, options: thời gian hết hạn của token
                {
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
                    req.body.logo = req.file.path;
                }
                else {
                    delete req.body.logo;
                }
                return [4 /*yield*/, account_company_model_1["default"].updateOne({
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
exports.createJobPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, file, newRecord;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                req.body.companyId = req.account.id;
                req.body.salaryMin = req.body.salaryMin ? parseInt(req.body.salaryMin) : 0;
                req.body.salaryMax = req.body.salaryMax ? parseInt(req.body.salaryMax) : 0;
                req.body.technologies = req.body.technologies ? req.body.technologies.split(", ") : [];
                req.body.images = [];
                // Xử lý mảng images
                if (req.files) {
                    for (_i = 0, _a = req.files; _i < _a.length; _i++) {
                        file = _a[_i];
                        req.body.images.push(file.path);
                    }
                }
                newRecord = new job_model_1["default"](req.body);
                return [4 /*yield*/, newRecord.save()];
            case 1:
                _b.sent();
                res.json({
                    code: "success",
                    message: "Tạo công việc thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.listJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var find, limitItems, page, currentPage, totalRecord, totalPage, skip, jobs, dataFinal, city, _i, jobs_1, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                find = {
                    companyId: req.account.id
                };
                limitItems = 2;
                page = 1;
                if (req.query.page) {
                    currentPage = parseInt("" + req.query.page);
                    if (currentPage > 0) {
                        page = currentPage;
                    }
                }
                return [4 /*yield*/, job_model_1["default"].countDocuments(find)];
            case 1:
                totalRecord = _a.sent();
                totalPage = Math.ceil(totalRecord / limitItems);
                if (page > totalPage && totalPage != 0) {
                    page = totalPage;
                }
                skip = (page - 1) * limitItems;
                return [4 /*yield*/, job_model_1["default"]
                        .find(find)
                        .sort({
                        createdAt: "desc"
                    })
                        .limit(limitItems)
                        .skip(skip)];
            case 2:
                jobs = _a.sent();
                dataFinal = [];
                return [4 /*yield*/, city_model_1["default"].findOne({
                        _id: req.account.city
                    })];
            case 3:
                city = _a.sent();
                for (_i = 0, jobs_1 = jobs; _i < jobs_1.length; _i++) {
                    item = jobs_1[_i];
                    dataFinal.push({
                        id: item.id,
                        companyLogo: req.account.logo,
                        title: item.title,
                        companyName: req.account.companyName,
                        salaryMin: item.salaryMin,
                        salaryMax: item.salaryMax,
                        position: item.position,
                        workingForm: item.workingForm,
                        companyCity: city === null || city === void 0 ? void 0 : city.name,
                        technologies: item.technologies
                    });
                }
                res.json({
                    code: "success",
                    message: "Lấy danh sách công việc thành công!",
                    jobs: dataFinal,
                    totalPage: totalPage
                });
                return [2 /*return*/];
        }
    });
}); };
exports.editJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, jobDetail, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, job_model_1["default"].findOne({
                        _id: id,
                        companyId: req.account.id
                    })];
            case 1:
                jobDetail = _a.sent();
                if (!jobDetail) {
                    res.json({
                        code: "error",
                        message: "Id không hợp lệ!"
                    });
                    return [2 /*return*/];
                }
                res.json({
                    code: "success",
                    message: "Thành công!",
                    jobDetail: jobDetail
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.json({
                    code: "error",
                    message: "Id không hợp lệ!"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editJobPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, jobDetail, _i, _a, file, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, job_model_1["default"].findOne({
                        _id: id,
                        companyId: req.account.id
                    })];
            case 1:
                jobDetail = _b.sent();
                if (!jobDetail) {
                    res.json({
                        code: "error",
                        message: "Id không hợp lệ!"
                    });
                    return [2 /*return*/];
                }
                req.body.salaryMin = req.body.salaryMin ? parseInt(req.body.salaryMin) : 0;
                req.body.salaryMax = req.body.salaryMax ? parseInt(req.body.salaryMax) : 0;
                req.body.technologies = req.body.technologies ? req.body.technologies.split(", ") : [];
                req.body.images = [];
                // Xử lý mảng images
                if (req.files) {
                    for (_i = 0, _a = req.files; _i < _a.length; _i++) {
                        file = _a[_i];
                        req.body.images.push(file.path);
                    }
                }
                return [4 /*yield*/, job_model_1["default"].updateOne({
                        _id: id,
                        companyId: req.account.id
                    }, req.body)];
            case 2:
                _b.sent();
                res.json({
                    code: "success",
                    message: "Cập nhật thành công!"
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                res.json({
                    code: "error",
                    message: "Id không hợp lệ!"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteJobDel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, jobDetail, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, job_model_1["default"].findOne({
                        _id: id,
                        companyId: req.account.id
                    })];
            case 1:
                jobDetail = _a.sent();
                if (!jobDetail) {
                    res.json({
                        code: "error",
                        message: "Id không hợp lệ!"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, job_model_1["default"].deleteOne({
                        _id: id,
                        companyId: req.account.id
                    })];
            case 2:
                _a.sent();
                res.json({
                    code: "success",
                    message: "Đã xóa!"
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                res.json({
                    code: "error",
                    message: "Id không hợp lệ!"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limitItems, page, currentPage, totalRecord, totalPage, skip, companyList, companyListFinal, _i, companyList_1, item, dataItemFinal, city, totalJob;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limitItems = 12;
                if (req.query.limitItems) {
                    limitItems = parseInt("" + req.query.limitItems);
                }
                page = 1;
                if (req.query.page) {
                    currentPage = parseInt("" + req.query.page);
                    if (currentPage > 0) {
                        page = currentPage;
                    }
                }
                return [4 /*yield*/, account_company_model_1["default"].countDocuments({})];
            case 1:
                totalRecord = _a.sent();
                totalPage = Math.ceil(totalRecord / limitItems);
                // console.log(totalPage);
                // console.log(totalRecord);
                // console.log(limitItems);
                if (page > totalPage && totalPage != 0) {
                    page = totalPage;
                }
                skip = (page - 1) * limitItems;
                return [4 /*yield*/, account_company_model_1["default"]
                        .find({})
                        .limit(limitItems)
                        .sort({
                        createdAt: "desc"
                    })
                        .limit(limitItems)
                        .skip(skip)];
            case 2:
                companyList = _a.sent();
                companyListFinal = [];
                _i = 0, companyList_1 = companyList;
                _a.label = 3;
            case 3:
                if (!(_i < companyList_1.length)) return [3 /*break*/, 7];
                item = companyList_1[_i];
                dataItemFinal = {
                    id: item.id,
                    logo: item.logo,
                    companyName: item.companyName,
                    cityName: "",
                    totalJob: 0
                };
                return [4 /*yield*/, city_model_1["default"].findOne({
                        _id: item.city
                    })];
            case 4:
                city = _a.sent();
                dataItemFinal.cityName = "" + (city === null || city === void 0 ? void 0 : city.name);
                return [4 /*yield*/, job_model_1["default"].countDocuments({
                        companyId: item.id
                    })];
            case 5:
                totalJob = _a.sent();
                dataItemFinal.totalJob = totalJob;
                companyListFinal.push(dataItemFinal);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7:
                res.json({
                    code: "success",
                    message: "Thành công!",
                    companyList: companyListFinal,
                    totalPage: totalPage
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, record, companyDetail, jobList, dataFinal, city, _i, jobList_1, item, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, account_company_model_1["default"].findOne({
                        _id: id
                    })];
            case 1:
                record = _a.sent();
                if (!record) {
                    res.json({
                        code: "error",
                        message: "Id không hợp lệ!"
                    });
                    return [2 /*return*/];
                }
                companyDetail = {
                    id: record.id,
                    logo: record.logo,
                    companyName: record.companyName,
                    address: record.address,
                    companyModel: record.companyModel,
                    companyEmployees: record.companyEmployees,
                    workingTime: record.workingTime,
                    workOvertime: record.workOvertime,
                    description: record.description
                };
                return [4 /*yield*/, job_model_1["default"]
                        .find({
                        companyId: record.id
                    })
                        .sort({
                        createdAt: "desc"
                    })];
            case 2:
                jobList = _a.sent();
                dataFinal = [];
                return [4 /*yield*/, city_model_1["default"].findOne({
                        _id: record.city
                    })];
            case 3:
                city = _a.sent();
                for (_i = 0, jobList_1 = jobList; _i < jobList_1.length; _i++) {
                    item = jobList_1[_i];
                    dataFinal.push({
                        id: item.id,
                        companyLogo: record.logo,
                        title: item.title,
                        companyName: record.companyName,
                        salaryMin: item.salaryMin,
                        salaryMax: item.salaryMax,
                        position: item.position,
                        workingForm: item.workingForm,
                        companyCity: city === null || city === void 0 ? void 0 : city.name,
                        technologies: item.technologies
                    });
                }
                res.json({
                    code: "success",
                    message: "Thành công!",
                    companyDetail: companyDetail,
                    jobList: dataFinal
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                res.json({
                    code: "error",
                    message: "Id không hợp lệ!"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.listCV = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, listJob, listJobId, totalPage, totalRecord, limitItems, page, currentPage, skip, listCV, dataFinal, _i, listCV_1, item, dataItemFinal, infoJob;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.account.id;
                return [4 /*yield*/, job_model_1["default"].find({
                        companyId: companyId
                    })];
            case 1:
                listJob = _a.sent();
                listJobId = listJob.map(function (item) { return item.id; });
                totalPage = 0;
                totalRecord = 0;
                limitItems = 3;
                page = 1;
                if (req.query.page) {
                    currentPage = parseInt("" + req.query.page);
                    if (currentPage > 0) {
                        page = currentPage;
                    }
                }
                return [4 /*yield*/, cv_model_1["default"].countDocuments()];
            case 2:
                totalRecord = _a.sent();
                totalPage = Math.ceil(totalRecord / limitItems);
                if (page > totalPage && totalPage != 0) {
                    page = totalPage;
                }
                skip = (page - 1) * limitItems;
                return [4 /*yield*/, cv_model_1["default"]
                        .find({
                        jobId: { $in: listJobId }
                    })
                        .sort({
                        createdAt: "desc"
                    })
                        .limit(limitItems)
                        .skip(skip)];
            case 3:
                listCV = _a.sent();
                dataFinal = [];
                _i = 0, listCV_1 = listCV;
                _a.label = 4;
            case 4:
                if (!(_i < listCV_1.length)) return [3 /*break*/, 7];
                item = listCV_1[_i];
                dataItemFinal = {
                    id: item.id,
                    jobTitle: "",
                    fullName: item.fullName,
                    email: item.email,
                    phone: item.phone,
                    jobSalaryMin: 0,
                    jobSalaryMax: 0,
                    jobPosition: "",
                    jobWorkingForm: "",
                    viewed: item.viewed,
                    status: item.status
                };
                return [4 /*yield*/, job_model_1["default"].findOne({
                        _id: item.jobId
                    })];
            case 5:
                infoJob = _a.sent();
                if (infoJob) {
                    dataItemFinal.jobTitle = "" + infoJob.title;
                    dataItemFinal.jobSalaryMin = parseInt("" + infoJob.salaryMin);
                    dataItemFinal.jobSalaryMax = parseInt("" + infoJob.salaryMax);
                    dataItemFinal.jobPosition = "" + infoJob.position;
                    dataItemFinal.jobWorkingForm = "" + infoJob.workingForm;
                }
                dataFinal.push(dataItemFinal);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
                res.json({
                    code: "success",
                    message: "Lấy danh sách CV thành công!",
                    listCV: dataFinal,
                    totalPage: totalPage,
                    totalRecord: totalRecord
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detailCV = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, cvId, infoCV, infoJob, dataFinalCV, dataFinalJob, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                companyId = req.account.id;
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
                        _id: infoCV.jobId,
                        companyId: companyId
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
                // Cập nhật trạng thái thành đã xem
                return [4 /*yield*/, cv_model_1["default"].updateOne({
                        _id: cvId
                    }, {
                        viewed: true
                    })];
            case 3:
                // Cập nhật trạng thái thành đã xem
                _a.sent();
                res.json({
                    code: "success",
                    message: "Thành công!",
                    infoCV: dataFinalCV,
                    infoJob: dataFinalJob
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                res.json({
                    code: "error",
                    message: "Id không hợp lệ!"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.changeStatusCVPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, status, cvId, infoCV, infoJob, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                companyId = req.account.id;
                status = req.body.action;
                cvId = req.body.id;
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
                        _id: infoCV.jobId,
                        companyId: companyId
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
                return [4 /*yield*/, cv_model_1["default"].updateOne({
                        _id: cvId
                    }, {
                        status: status
                    })];
            case 3:
                _a.sent();
                res.json({
                    code: "success",
                    message: "Thành công!"
                });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.log(error_6);
                res.json({
                    code: "error",
                    message: "Id không hợp lệ!"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteCVDel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, cvId, infoCV, infoJob, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                companyId = req.account.id;
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
                        _id: infoCV.jobId,
                        companyId: companyId
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
                return [4 /*yield*/, cv_model_1["default"].deleteOne({
                        _id: cvId
                    })];
            case 3:
                _a.sent();
                res.json({
                    code: "success",
                    message: "Đã xóa!"
                });
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.log(error_7);
                res.json({
                    code: "error",
                    message: "Id không hợp lệ!"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
