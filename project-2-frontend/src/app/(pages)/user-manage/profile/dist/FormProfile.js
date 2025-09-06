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
// Đăng ký plugins
react_filepond_1.registerPlugin(filepond_plugin_file_validate_type_1["default"], filepond_plugin_image_preview_1["default"]);
exports.FormProfile = function () {
    var infoUser = useAuth_1.useAuth().infoUser;
    var _a = react_1.useState([]), avatars = _a[0], setAvatars = _a[1];
    var _b = react_1.useState(false), isValid = _b[0], setIsValid = _b[1];
    react_1.useEffect(function () {
        if (infoUser) {
            if (infoUser.avatar) {
                setAvatars([
                    {
                        source: infoUser.avatar
                    }
                ]);
            }
            var validator = new just_validate_1["default"]("#profileForm");
            validator
                .addField('#fullName', [
                {
                    rule: 'required',
                    errorMessage: 'Vui lòng nhập họ tên!'
                },
                {
                    rule: 'minLength',
                    value: 5,
                    errorMessage: 'Họ tên phải có ít nhất 5 ký tự!'
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'Họ tên không được vượt quá 50 ký tự!'
                },
            ])
                .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'Vui lòng nhập email của bạn!'
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
    }, [infoUser]);
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var fullName, email, phone, avatar, formData, promise;
        return __generator(this, function (_a) {
            event.preventDefault();
            fullName = event.target.fullName.value;
            email = event.target.email.value;
            phone = event.target.phone.value;
            avatar = null;
            if (avatars.length > 0) {
                avatar = avatars[0].file;
            }
            if (isValid) {
                formData = new FormData();
                formData.append("fullName", fullName);
                formData.append("email", email);
                formData.append("phone", phone);
                formData.append("avatar", avatar);
                promise = fetch(process.env.NEXT_PUBLIC_API_URL + "/user/profile", {
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
        infoUser && (React.createElement("form", { onSubmit: handleSubmit, id: "profileForm", action: "", className: "grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]" },
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "fullName", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "H\u1ECD t\u00EAn *"),
                React.createElement("input", { type: "text", name: "fullName", defaultValue: infoUser.fullName, id: "fullName", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "avatar", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Avatar"),
                React.createElement(react_filepond_1.FilePond, { name: "avatar", allowMultiple: false, allowRemove: true, labelIdle: '+', acceptedFileTypes: ["image/*"], files: avatars, onupdatefiles: setAvatars })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "email", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Email *"),
                React.createElement("input", { type: "email", name: "email", defaultValue: infoUser.email, id: "email", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "phone", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"),
                React.createElement("input", { type: "text", name: "phone", defaultValue: infoUser.phone, id: "phone", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("button", { className: "bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white" }, "C\u1EADp nh\u1EADt"))))));
};
