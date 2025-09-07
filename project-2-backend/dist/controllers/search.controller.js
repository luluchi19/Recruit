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
exports.search = void 0;
const job_model_1 = __importDefault(require("../models/job.model"));
const account_company_model_1 = __importDefault(require("../models/account-company.model"));
const city_model_1 = __importDefault(require("../models/city.model"));
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataFinal = [];
    let totalPage = 0;
    let totalRecord = 0;
    if (Object.keys(req.query).length > 0) {
        const find = {};
        // Language
        if (req.query.language) {
            find.technologies = req.query.language;
        }
        // City
        if (req.query.city) {
            const city = yield city_model_1.default.findOne({
                name: req.query.city
            });
            if (city) {
                const listAccountCompanyInCity = yield account_company_model_1.default.find({
                    city: city.id
                });
                const listIdAccountCompany = listAccountCompanyInCity.map(item => item.id);
                find.companyId = { $in: listIdAccountCompany };
            }
        }
        // Company
        if (req.query.company) {
            const accountCompany = yield account_company_model_1.default.findOne({
                companyName: req.query.company
            });
            find.companyId = accountCompany === null || accountCompany === void 0 ? void 0 : accountCompany.id;
        }
        // Keyword
        if (req.query.keyword) {
            const keywordRegex = new RegExp(`${req.query.keyword}`, "i"); //ép kiểu về dạng chuỗi, tìm kiếm không phân biệt chữ hoa chữ thường
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
        // Phân trang
        const limitItems = 3;
        let page = 1;
        if (req.query.page) {
            const currentPage = parseInt(`${req.query.page}`);
            if (currentPage > 0) {
                page = currentPage;
            }
        }
        totalRecord = yield job_model_1.default.countDocuments(find);
        totalPage = Math.ceil(totalRecord / limitItems);
        if (page > totalPage && totalPage != 0) {
            page = totalPage;
        }
        const skip = (page - 1) * limitItems;
        // Hết Phân trang
        const jobs = yield job_model_1.default
            .find(find)
            .sort({
            createdAt: "desc"
        })
            .limit(limitItems)
            .skip(skip);
        for (const item of jobs) {
            const itemFinal = {
                id: item.id,
                companyLogo: "",
                title: item.title,
                companyName: "",
                salaryMin: item.salaryMin,
                salaryMax: item.salaryMax,
                position: item.position,
                workingForm: item.workingForm,
                companyCity: "",
                technologies: item.technologies,
            };
            const companyInfo = yield account_company_model_1.default.findOne({
                _id: item.companyId
            });
            if (companyInfo) {
                itemFinal.companyLogo = `${companyInfo.logo}`;
                itemFinal.companyName = `${companyInfo.companyName}`;
                const city = yield city_model_1.default.findOne({
                    _id: companyInfo.city
                });
                itemFinal.companyCity = `${city === null || city === void 0 ? void 0 : city.name}`;
            }
            dataFinal.push(itemFinal);
        }
    }
    res.json({
        code: "success",
        message: "Thành công!",
        jobs: dataFinal,
        totalPage: totalPage,
        totalRecord: totalRecord
    });
});
exports.search = search;
