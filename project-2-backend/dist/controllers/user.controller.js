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
exports.detailCV = exports.listCV = exports.profilePatch = exports.loginPost = exports.registerPost = void 0;
const account_user_model_1 = __importDefault(require("../models/account-user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cv_model_1 = __importDefault(require("../models/cv.model"));
const job_model_1 = __importDefault(require("../models/job.model"));
const account_company_model_1 = __importDefault(require("../models/account-company.model"));
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    const existAccount = yield account_user_model_1.default.findOne({
        email: email
    });
    if (existAccount) {
        res.json({
            code: "error",
            message: "Email đã tồn tại trong hệ thống!"
        });
        return;
    }
    // Mã hóa mật khẩu với bcrypt
    const salt = yield bcryptjs_1.default.genSalt(10); // Tạo salt - Chuỗi ngẫu nhiên có 10 ký tự
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt); // Mã hóa mật khẩu
    const newAccount = new account_user_model_1.default({
        fullName: fullName,
        email: email,
        password: hashedPassword
    });
    yield newAccount.save();
    res.json({
        code: "success",
        message: "Đăng ký tài khoản thành công!"
    });
});
exports.registerPost = registerPost;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existAccount = yield account_user_model_1.default.findOne({
        email: email
    });
    if (!existAccount) {
        res.json({
            code: "error",
            message: "Email không tồn tại trong hệ thống!"
        });
        return;
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, `${existAccount.password}`); // chuyển existAccount.password sang string
    if (!isPasswordValid) {
        res.json({
            code: "error",
            message: "Mật khẩu không đúng!"
        });
        return;
    }
    // Tạo JWT
    const token = jsonwebtoken_1.default.sign({
        id: existAccount.id,
        email: existAccount.email
    }, `${process.env.JWT_SECRET}`, {
        expiresIn: '1d' // Token có thời hạn 1 ngày
    });
    // Lưu token vào cookie
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // Token có hiệu lực trong 1 ngày
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false, // false: http, true: https
        sameSite: "lax" // Cho phép gửi cookie giữa các domain
    });
    res.json({
        code: "success",
        message: "Đăng nhập thành công!",
    });
});
exports.loginPost = loginPost;
const profilePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        req.body.avatar = req.file.path;
    }
    else {
        delete req.body.avatar; // nếu không có file thì xóa trường avatar trong req.body
    }
    yield account_user_model_1.default.updateOne({
        _id: req.account.id
    }, req.body);
    res.json({
        code: "success",
        message: "Cập nhật thành công!"
    });
});
exports.profilePatch = profilePatch;
const listCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.account.email;
    const listCV = yield cv_model_1.default
        .find({
        email: userEmail
    })
        .sort({
        createdAt: "desc"
    });
    const dataFinal = [];
    for (const item of listCV) {
        const dataItemFinal = {
            id: item.id,
            jobTitle: "",
            companyName: "",
            jobSalaryMin: 0,
            jobSalaryMax: 0,
            jobPosition: "",
            jobWorkingForm: "",
            status: item.status,
        };
        const infoJob = yield job_model_1.default.findOne({
            _id: item.jobId
        });
        if (infoJob) {
            dataItemFinal.jobTitle = `${infoJob.title}`;
            dataItemFinal.jobSalaryMin = parseInt(`${infoJob.salaryMin}`);
            dataItemFinal.jobSalaryMax = parseInt(`${infoJob.salaryMax}`);
            dataItemFinal.jobPosition = `${infoJob.position}`;
            dataItemFinal.jobWorkingForm = `${infoJob.workingForm}`;
            const infoCompany = yield account_company_model_1.default.findOne({
                _id: infoJob.companyId
            });
            if (infoCompany) {
                dataItemFinal.companyName = `${infoCompany.companyName}`;
                dataFinal.push(dataItemFinal);
            }
        }
    }
    res.json({
        code: "success",
        message: "Lấy danh sách CV thành công!",
        listCV: dataFinal
    });
});
exports.listCV = listCV;
const detailCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cvId = req.params.id;
        const infoCV = yield cv_model_1.default.findOne({
            _id: cvId
        });
        if (!infoCV) {
            res.json({
                code: "error",
                message: "Id không hợp lệ!"
            });
            return;
        }
        const infoJob = yield job_model_1.default.findOne({
            _id: infoCV.jobId
        });
        if (!infoJob) {
            res.json({
                code: "error",
                message: "Không có quyền truy cập!"
            });
            return;
        }
        const dataFinalCV = {
            fullName: infoCV.fullName,
            email: infoCV.email,
            phone: infoCV.phone,
            fileCV: infoCV.fileCV,
        };
        const dataFinalJob = {
            id: infoJob.id,
            title: infoJob.title,
            salaryMin: infoJob.salaryMin,
            salaryMax: infoJob.salaryMax,
            position: infoJob.position,
            workingForm: infoJob.workingForm,
            technologies: infoJob.technologies,
        };
        console.log(dataFinalCV, dataFinalJob);
        res.json({
            code: "success",
            message: "Thành công!",
            infoCV: dataFinalCV,
            infoJob: dataFinalJob
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
exports.detailCV = detailCV;
