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
exports.deleteCVDel = exports.changeStatusCVPatch = exports.detailCV = exports.listCV = exports.detail = exports.list = exports.deleteJobDel = exports.editJobPatch = exports.editJob = exports.listJob = exports.createJobPost = exports.profilePatch = exports.loginPost = exports.registerPost = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const account_company_model_1 = __importDefault(require("../models/account-company.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const job_model_1 = __importDefault(require("../models/job.model"));
const city_model_1 = __importDefault(require("../models/city.model"));
const cv_model_1 = __importDefault(require("../models/cv.model"));
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, email, password } = req.body;
    const existAccount = yield account_company_model_1.default.findOne({
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
    const newAccount = new account_company_model_1.default({
        companyName: companyName,
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
    const existAccount = yield account_company_model_1.default.findOne({
        email: email
    });
    if (!existAccount) {
        res.json({
            code: "error",
            message: "Email không tồn tại trong hệ thống!"
        });
        return;
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, `${existAccount.password}`);
    if (!isPasswordValid) {
        res.json({
            code: "error",
            message: "Mật khẩu không đúng!"
        });
        return;
    }
    // Tạo JWT
    const token = jsonwebtoken_1.default.sign(// sign: 3 tham số: payload: có thể là dạng chuỗi, object, buffer(file ảnh được chuyển thành buffer), secret: bí mật để mã hóa token, options: thời gian hết hạn của token
    {
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
        req.body.logo = req.file.path;
    }
    else {
        delete req.body.logo;
    }
    yield account_company_model_1.default.updateOne({
        _id: req.account.id
    }, req.body);
    res.json({
        code: "success",
        message: "Cập nhật thành công!"
    });
});
exports.profilePatch = profilePatch;
const createJobPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.companyId = req.account.id;
    req.body.salaryMin = req.body.salaryMin ? parseInt(req.body.salaryMin) : 0;
    req.body.salaryMax = req.body.salaryMax ? parseInt(req.body.salaryMax) : 0;
    req.body.technologies = req.body.technologies ? req.body.technologies.split(", ") : [];
    req.body.images = [];
    // Xử lý mảng images
    if (req.files) {
        for (const file of req.files) {
            req.body.images.push(file.path);
        }
    }
    const newRecord = new job_model_1.default(req.body);
    yield newRecord.save();
    res.json({
        code: "success",
        message: "Tạo công việc thành công!"
    });
});
exports.createJobPost = createJobPost;
const listJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        companyId: req.account.id
    };
    // Phân trang
    const limitItems = 2;
    let page = 1;
    if (req.query.page) {
        const currentPage = parseInt(`${req.query.page}`);
        if (currentPage > 0) {
            page = currentPage;
        }
    }
    const totalRecord = yield job_model_1.default.countDocuments(find);
    const totalPage = Math.ceil(totalRecord / limitItems);
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
    const dataFinal = [];
    const city = yield city_model_1.default.findOne({
        _id: req.account.city
    });
    for (const item of jobs) {
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
            technologies: item.technologies,
        });
    }
    res.json({
        code: "success",
        message: "Lấy danh sách công việc thành công!",
        jobs: dataFinal,
        totalPage: totalPage
    });
});
exports.listJob = listJob;
const editJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const jobDetail = yield job_model_1.default.findOne({
            _id: id,
            companyId: req.account.id
        });
        if (!jobDetail) {
            res.json({
                code: "error",
                message: "Id không hợp lệ!"
            });
            return;
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
exports.editJob = editJob;
const editJobPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const jobDetail = yield job_model_1.default.findOne({
            _id: id,
            companyId: req.account.id
        });
        if (!jobDetail) {
            res.json({
                code: "error",
                message: "Id không hợp lệ!"
            });
            return;
        }
        req.body.salaryMin = req.body.salaryMin ? parseInt(req.body.salaryMin) : 0;
        req.body.salaryMax = req.body.salaryMax ? parseInt(req.body.salaryMax) : 0;
        req.body.technologies = req.body.technologies ? req.body.technologies.split(", ") : [];
        req.body.images = [];
        // Xử lý mảng images
        if (req.files) {
            for (const file of req.files) {
                req.body.images.push(file.path);
            }
        }
        yield job_model_1.default.updateOne({
            _id: id,
            companyId: req.account.id
        }, req.body);
        res.json({
            code: "success",
            message: "Cập nhật thành công!"
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
exports.editJobPatch = editJobPatch;
const deleteJobDel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const jobDetail = yield job_model_1.default.findOne({
            _id: id,
            companyId: req.account.id
        });
        if (!jobDetail) {
            res.json({
                code: "error",
                message: "Id không hợp lệ!"
            });
            return;
        }
        yield job_model_1.default.deleteOne({
            _id: id,
            companyId: req.account.id
        });
        res.json({
            code: "success",
            message: "Đã xóa!"
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
exports.deleteJobDel = deleteJobDel;
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let limitItems = 12;
    if (req.query.limitItems) {
        limitItems = parseInt(`${req.query.limitItems}`);
    }
    // Phân trang
    let page = 1;
    if (req.query.page) {
        const currentPage = parseInt(`${req.query.page}`);
        if (currentPage > 0) {
            page = currentPage;
        }
    }
    const totalRecord = yield account_company_model_1.default.countDocuments({});
    const totalPage = Math.ceil(totalRecord / limitItems);
    // console.log(totalPage);
    // console.log(totalRecord);
    // console.log(limitItems);
    if (page > totalPage && totalPage != 0) {
        page = totalPage;
    }
    const skip = (page - 1) * limitItems;
    // Hết Phân trang
    const companyList = yield account_company_model_1.default
        .find({})
        .limit(limitItems)
        .sort({
        createdAt: "desc"
    })
        .limit(limitItems)
        .skip(skip);
    const companyListFinal = [];
    for (const item of companyList) {
        const dataItemFinal = {
            id: item.id,
            logo: item.logo,
            companyName: item.companyName,
            cityName: "",
            totalJob: 0
        };
        // Thành phố
        const city = yield city_model_1.default.findOne({
            _id: item.city
        });
        dataItemFinal.cityName = `${city === null || city === void 0 ? void 0 : city.name}`;
        // Tổng số việc làm
        const totalJob = yield job_model_1.default.countDocuments({
            companyId: item.id
        });
        dataItemFinal.totalJob = totalJob;
        companyListFinal.push(dataItemFinal);
    }
    res.json({
        code: "success",
        message: "Thành công!",
        companyList: companyListFinal,
        totalPage: totalPage
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const record = yield account_company_model_1.default.findOne({
            _id: id
        });
        if (!record) {
            res.json({
                code: "error",
                message: "Id không hợp lệ!"
            });
            return;
        }
        // Thông tin công ty
        const companyDetail = {
            id: record.id,
            logo: record.logo,
            companyName: record.companyName,
            address: record.address,
            companyModel: record.companyModel,
            companyEmployees: record.companyEmployees,
            workingTime: record.workingTime,
            workOvertime: record.workOvertime,
            description: record.description,
        };
        // Danh sách việc làm
        const jobList = yield job_model_1.default
            .find({
            companyId: record.id
        })
            .sort({
            createdAt: "desc"
        });
        const dataFinal = [];
        const city = yield city_model_1.default.findOne({
            _id: record.city
        });
        for (const item of jobList) {
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
                technologies: item.technologies,
            });
        }
        res.json({
            code: "success",
            message: "Thành công!",
            companyDetail: companyDetail,
            jobList: dataFinal
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
const listCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyId = req.account.id;
    const listJob = yield job_model_1.default.find({
        companyId: companyId
    });
    const listJobId = listJob.map(item => item.id);
    let totalPage = 0;
    let totalRecord = 0;
    // Phân trang
    const limitItems = 3;
    let page = 1;
    if (req.query.page) {
        const currentPage = parseInt(`${req.query.page}`);
        if (currentPage > 0) {
            page = currentPage;
        }
    }
    totalRecord = yield cv_model_1.default.countDocuments();
    totalPage = Math.ceil(totalRecord / limitItems);
    if (page > totalPage && totalPage != 0) {
        page = totalPage;
    }
    const skip = (page - 1) * limitItems;
    // Hết Phân trang
    const listCV = yield cv_model_1.default
        .find({
        jobId: { $in: listJobId }
    })
        .sort({
        createdAt: "desc"
    })
        .limit(limitItems)
        .skip(skip);
    const dataFinal = [];
    for (const item of listCV) {
        const dataItemFinal = {
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
        }
        dataFinal.push(dataItemFinal);
    }
    res.json({
        code: "success",
        message: "Lấy danh sách CV thành công!",
        listCV: dataFinal,
        totalPage: totalPage,
        totalRecord: totalRecord
    });
});
exports.listCV = listCV;
const detailCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.account.id;
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
            _id: infoCV.jobId,
            companyId: companyId
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
        // Cập nhật trạng thái thành đã xem
        yield cv_model_1.default.updateOne({
            _id: cvId
        }, {
            viewed: true
        });
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
const changeStatusCVPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.account.id;
        const status = req.body.action;
        const cvId = req.body.id;
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
            _id: infoCV.jobId,
            companyId: companyId
        });
        if (!infoJob) {
            res.json({
                code: "error",
                message: "Không có quyền truy cập!"
            });
            return;
        }
        yield cv_model_1.default.updateOne({
            _id: cvId
        }, {
            status: status
        });
        res.json({
            code: "success",
            message: "Thành công!"
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
exports.changeStatusCVPatch = changeStatusCVPatch;
const deleteCVDel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.account.id;
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
            _id: infoCV.jobId,
            companyId: companyId
        });
        if (!infoJob) {
            res.json({
                code: "error",
                message: "Không có quyền truy cập!"
            });
            return;
        }
        yield cv_model_1.default.deleteOne({
            _id: cvId
        });
        res.json({
            code: "success",
            message: "Đã xóa!"
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
exports.deleteCVDel = deleteCVDel;
