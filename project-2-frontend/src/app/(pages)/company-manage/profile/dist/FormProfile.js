/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
exports.FormProfile = void 0;
var useAuth_1 = require("@/hooks/useAuth");
var react_1 = require("react");
var just_validate_1 = require("just-validate");
var react_filepond_1 = require("react-filepond");
require("filepond/dist/filepond.min.css");
var filepond_plugin_file_validate_type_1 = require("filepond-plugin-file-validate-type");
var filepond_plugin_image_preview_1 = require("filepond-plugin-image-preview");
require("filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css");
var sonner_1 = require("sonner");
var EditorMCE_1 = require("@/app/components/editor/EditorMCE");
// Đăng ký plugins
react_filepond_1.registerPlugin(filepond_plugin_file_validate_type_1["default"], filepond_plugin_image_preview_1["default"]);
exports.FormProfile = function () {
    var infoCompany = useAuth_1.useAuth().infoCompany;
    var _a = react_1.useState([]), logos = _a[0], setLogos = _a[1];
    var _b = react_1.useState(false), isValid = _b[0], setIsValid = _b[1];
    var _c = react_1.useState([]), cityList = _c[0], setCityList = _c[1];
    var editorRef = react_1.useRef(null);
    react_1.useEffect(function () {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/city/list")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            setCityList(data.cityList);
        });
    }, []);
    react_1.useEffect(function () {
        if (infoCompany) {
            if (infoCompany.logo) {
                setLogos([
                    {
                        source: infoCompany.logo
                    }
                ]);
            }
            var validator = new just_validate_1["default"]("#profileForm");
            validator
                .addField('#companyName', [
                {
                    rule: 'required',
                    errorMessage: 'Vui lòng nhập tên công ty!'
                },
                {
                    rule: 'maxLength',
                    value: 200,
                    errorMessage: 'Tên công ty không được vượt quá 200 ký tự!'
                },
            ])
                .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'Vui lòng nhập email!'
                },
                {
                    rule: 'email',
                    errorMessage: 'Email không đúng định dạng!'
                },
            ])
                .onFail(function () {
                setIsValid(false);
            })
                .onSuccess(function () {
                setIsValid(true);
            });
        }
    }, [infoCompany]);
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var companyName, city, address, companyModel, companyEmployees, workingTime, workOvertime, email, description, phone, logo, formData, promise;
        return __generator(this, function (_a) {
            event.preventDefault();
            companyName = event.target.companyName.value;
            city = event.target.city.value;
            address = event.target.address.value;
            companyModel = event.target.companyModel.value;
            companyEmployees = event.target.companyEmployees.value;
            workingTime = event.target.workingTime.value;
            workOvertime = event.target.workOvertime.value;
            email = event.target.email.value;
            description = "";
            if (editorRef.current) {
                description = editorRef.current.getContent();
            }
            phone = event.target.phone.value;
            logo = null;
            if (logos.length > 0) {
                logo = logos[0].file;
            }
            if (isValid) {
                formData = new FormData();
                formData.append("companyName", companyName);
                formData.append("city", city);
                formData.append("address", address);
                formData.append("companyModel", companyModel);
                formData.append("companyEmployees", companyEmployees);
                formData.append("workingTime", workingTime);
                formData.append("workOvertime", workOvertime);
                formData.append("email", email);
                formData.append("description", description);
                formData.append("logo", logo);
                formData.append("phone", phone);
                promise = fetch(process.env.NEXT_PUBLIC_API_URL + "/company/profile", {
                    method: "PATCH",
                    body: formData,
                    credentials: "include"
                })
                    .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, res.json()];
                            case 1:
                                data = _a.sent();
                                if (data.code === "error") {
                                    throw new Error(data.message);
                                }
                                return [2 /*return*/, data];
                        }
                    });
                }); });
                sonner_1.toast.promise(promise, {
                    loading: 'Đang cập nhật...',
                    success: function (data) { return "" + data.message; },
                    error: function (err) { return err.message || 'Đã xảy ra lỗi!'; }
                });
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(sonner_1.Toaster, { position: "top-right", richColors: true }),
        infoCompany && (React.createElement("form", { onSubmit: handleSubmit, id: "profileForm", action: "", className: "grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]" },
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "companyName", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "T\u00EAn c\u00F4ng ty *"),
                React.createElement("input", { type: "text", defaultValue: infoCompany.companyName, name: "companyName", id: "companyName", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "logo", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Logo"),
                React.createElement(react_filepond_1.FilePond, { name: "logo", allowMultiple: false, allowRemove: true, labelIdle: '+', acceptedFileTypes: ["image/*"], files: logos, onupdatefiles: setLogos })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "city", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Th\u00E0nh ph\u1ED1"),
                React.createElement("select", { name: "city", defaultValue: infoCompany.city, id: "city", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" },
                    React.createElement("option", { value: "" }, "-- Ch\u1ECDn th\u00E0nh ph\u1ED1 --"),
                    cityList.map(function (item) { return (React.createElement("option", { value: item._id, key: item._id }, item.name)); }))),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "address", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "\u0110\u1ECBa ch\u1EC9"),
                React.createElement("input", { type: "text", name: "address", defaultValue: infoCompany.address, id: "address", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "companyModel", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "M\u00F4 h\u00ECnh c\u00F4ng ty"),
                React.createElement("input", { type: "text", name: "companyModel", defaultValue: infoCompany.companyModel, id: "companyModel", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "companyEmployees", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Quy m\u00F4 c\u00F4ng ty"),
                React.createElement("input", { type: "text", name: "companyEmployees", defaultValue: infoCompany.companyEmployees, id: "companyEmployees", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "workingTime", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Th\u1EDDi gian l\u00E0m vi\u1EC7c"),
                React.createElement("input", { type: "text", name: "workingTime", defaultValue: infoCompany.workingTime, id: "workingTime", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "workOvertime", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "L\u00E0m vi\u1EC7c ngo\u00E0i gi\u1EDD"),
                React.createElement("input", { type: "text", name: "workOvertime", defaultValue: infoCompany.workOvertime, id: "workOvertime", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "email", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Email *"),
                React.createElement("input", { type: "email", name: "email", defaultValue: infoCompany.email, id: "email", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "phone", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"),
                React.createElement("input", { type: "text", name: "phone", defaultValue: infoCompany.phone, id: "phone", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "description", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "M\u00F4 t\u1EA3 chi ti\u1EBFt"),
                React.createElement(EditorMCE_1.EditorMCE, { editorRef: editorRef, value: infoCompany.description })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("button", { className: "bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white" }, "C\u1EADp nh\u1EADt"))))));
};
