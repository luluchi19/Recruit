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
exports.search = void 0;
var job_model_1 = require("../models/job.model");
var account_company_model_1 = require("../models/account-company.model");
var city_model_1 = require("../models/city.model");
exports.search = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataFinal, totalPage, totalRecord, find, city, listAccountCompanyInCity, listIdAccountCompany, accountCompany, keywordRegex, limitItems, page, currentPage, skip, jobs, _i, jobs_1, item, itemFinal, companyInfo, city;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dataFinal = [];
                totalPage = 0;
                totalRecord = 0;
                if (!(Object.keys(req.query).length > 0)) return [3 /*break*/, 13];
                find = {};
                // Language
                if (req.query.language) {
                    find.technologies = req.query.language;
                }
                if (!req.query.city) return [3 /*break*/, 3];
                return [4 /*yield*/, city_model_1["default"].findOne({
                        name: req.query.city
                    })];
            case 1:
                city = _a.sent();
                if (!city) return [3 /*break*/, 3];
                return [4 /*yield*/, account_company_model_1["default"].find({
                        city: city.id
                    })];
            case 2:
                listAccountCompanyInCity = _a.sent();
                listIdAccountCompany = listAccountCompanyInCity.map(function (item) { return item.id; });
                find.companyId = { $in: listIdAccountCompany };
                _a.label = 3;
            case 3:
                if (!req.query.company) return [3 /*break*/, 5];
                return [4 /*yield*/, account_company_model_1["default"].findOne({
                        companyName: req.query.company
                    })];
            case 4:
                accountCompany = _a.sent();
                find.companyId = accountCompany === null || accountCompany === void 0 ? void 0 : accountCompany.id;
                _a.label = 5;
            case 5:
                // Keyword
                if (req.query.keyword) {
                    keywordRegex = new RegExp("" + req.query.keyword, "i");
                    find["$or"] = [
                        { title: keywordRegex },
                        { technologies: keywordRegex }
                    ];
                }
                // Position
                if (req.query.position) {
                    find.position = req.query.position;
                }
                // Working Form
                if (req.query.workingForm) {
                    find.workingForm = req.query.workingForm;
                }
                limitItems = 3;
                page = 1;
                if (req.query.page) {
                    currentPage = parseInt("" + req.query.page);
                    if (currentPage > 0) {
                        page = currentPage;
                    }
                }
                return [4 /*yield*/, job_model_1["default"].countDocuments(find)];
            case 6:
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
            case 7:
                jobs = _a.sent();
                _i = 0, jobs_1 = jobs;
                _a.label = 8;
            case 8:
                if (!(_i < jobs_1.length)) return [3 /*break*/, 13];
                item = jobs_1[_i];
                itemFinal = {
                    id: item.id,
                    companyLogo: "",
                    title: item.title,
                    companyName: "",
                    salaryMin: item.salaryMin,
                    salaryMax: item.salaryMax,
                    position: item.position,
                    workingForm: item.workingForm,
                    companyCity: "",
                    technologies: item.technologies
                };
                return [4 /*yield*/, account_company_model_1["default"].findOne({
                        _id: item.companyId
                    })];
            case 9:
                companyInfo = _a.sent();
                if (!companyInfo) return [3 /*break*/, 11];
                itemFinal.companyLogo = "" + companyInfo.logo;
                itemFinal.companyName = "" + companyInfo.companyName;
                return [4 /*yield*/, city_model_1["default"].findOne({
                        _id: companyInfo.city
                    })];
            case 10:
                city = _a.sent();
                itemFinal.companyCity = "" + (city === null || city === void 0 ? void 0 : city.name);
                _a.label = 11;
            case 11:
                dataFinal.push(itemFinal);
                _a.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 8];
            case 13:
                res.json({
                    code: "success",
                    message: "Thành công!",
                    jobs: dataFinal,
                    totalPage: totalPage,
                    totalRecord: totalRecord
                });
                return [2 /*return*/];
        }
    });
}); };
