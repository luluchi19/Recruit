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
exports.applyPost = exports.detail = void 0;
const job_model_1 = __importDefault(require("../models/job.model"));
const account_company_model_1 = __importDefault(require("../models/account-company.model"));
const cv_model_1 = __importDefault(require("../models/cv.model"));
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const record = yield job_model_1.default.findOne({
            _id: id
        });
        if (!record) {
            res.json({
                code: "error",
                message: "Id không hợp lệ!"
            });
            return;
        }
        const jobDetail = {
            id: record.id,
            title: record.title,
            companyName: "",
            salaryMin: record.salaryMin,
            salaryMax: record.salaryMax,
            images: record.images,
            position: record.position,
            workingForm: record.workingForm,
            companyAddress: "",
            technologies: record.technologies,
            description: record.description,
            companyLogo: "",
            companyId: record.companyId,
            companyModel: "",
            companyEmployees: "",
            companyWorkingTime: "",
            companyWorkOvertime: ""
        };
        const companyInfo = yield account_company_model_1.default.findOne({
            _id: record.companyId
        });
        if (companyInfo) {
            jobDetail.companyName = `${companyInfo.companyName}`;
            jobDetail.companyAddress = `${companyInfo.address}`;
            jobDetail.companyLogo = `${companyInfo.logo}`;
            jobDetail.companyModel = `${companyInfo.companyModel}`;
            jobDetail.companyEmployees = `${companyInfo.companyEmployees}`;
            jobDetail.companyWorkingTime = `${companyInfo.workingTime}`;
            jobDetail.companyWorkOvertime = `${companyInfo.workOvertime}`;
        }
        res.json({
            code: "success",
            message: "Thành công!",
            jobDetail: jobDetail
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: "error",
            message: "Id không hợp lệ!"
        });
    }
});
exports.detail = detail;
const applyPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.fileCV = req.file ? req.file.path : "";
    const newRecord = new cv_model_1.default(req.body);
    yield newRecord.save();
    res.json({
        code: "success",
        message: "Đã gửi CV thành công!"
    });
});
exports.applyPost = applyPost;
