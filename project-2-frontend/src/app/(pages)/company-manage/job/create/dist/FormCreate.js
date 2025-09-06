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
exports.FormCreate = void 0;
var EditorMCE_1 = require("@/app/components/editor/EditorMCE");
var just_validate_1 = require("just-validate");
var react_1 = require("react");
var react_filepond_1 = require("react-filepond");
require("filepond/dist/filepond.min.css");
var filepond_plugin_file_validate_type_1 = require("filepond-plugin-file-validate-type");
var filepond_plugin_image_preview_1 = require("filepond-plugin-image-preview");
require("filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css");
var sonner_1 = require("sonner");
var variable_1 = require("@/config/variable");
// Đăng ký plugins
react_filepond_1.registerPlugin(filepond_plugin_file_validate_type_1["default"], filepond_plugin_image_preview_1["default"]);
exports.FormCreate = function () {
    var editorRef = react_1.useRef(null);
    var _a = react_1.useState(false), isValid = _a[0], setIsValid = _a[1];
    var _b = react_1.useState([]), images = _b[0], setImages = _b[1];
    react_1.useEffect(function () {
        var validator = new just_validate_1["default"]("#createForm");
        validator
            .addField('#title', [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập tên công việc!'
            },
        ])
            .addField('#salaryMin', [
            {
                rule: 'minNumber',
                value: 0,
                errorMessage: 'Vui lòng nhập mức lương >= 0'
            },
        ])
            .addField('#salaryMax', [
            {
                rule: 'minNumber',
                value: 0,
                errorMessage: 'Vui lòng nhập mức lương >= 0'
            },
        ])
            .onFail(function () {
            setIsValid(false);
        })
            .onSuccess(function () {
            setIsValid(true);
        });
    }, []);
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var title, salaryMin, salaryMax, position, workingForm, technologies, description, formData, _i, images_1, image, promise;
        return __generator(this, function (_a) {
            event.preventDefault();
            title = event.target.title.value;
            salaryMin = event.target.salaryMin.value;
            salaryMax = event.target.salaryMax.value;
            position = event.target.position.value;
            workingForm = event.target.workingForm.value;
            technologies = event.target.technologies.value;
            description = "";
            if (editorRef.current) {
                description = editorRef.current.getContent();
            }
            if (isValid) {
                formData = new FormData();
                formData.append("title", title);
                formData.append("salaryMin", salaryMin);
                formData.append("salaryMax", salaryMax);
                formData.append("position", position);
                formData.append("workingForm", workingForm);
                formData.append("technologies", technologies);
                formData.append("description", description);
                // images
                if (images.length > 0) {
                    for (_i = 0, images_1 = images; _i < images_1.length; _i++) {
                        image = images_1[_i];
                        formData.append("images", image.file);
                    }
                }
                promise = fetch(process.env.NEXT_PUBLIC_API_URL + "/company/job/create", {
                    method: "POST",
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
                                event.target.reset();
                                setImages([]);
                                return [2 /*return*/, data];
                        }
                    });
                }); });
                sonner_1.toast.promise(promise, {
                    loading: 'Đang tạo mới...',
                    success: function (data) { return "" + data.message; },
                    error: function (err) { return err.message || 'Đã xảy ra lỗi!'; }
                });
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(sonner_1.Toaster, { position: "top-right", richColors: true }),
        React.createElement("form", { onSubmit: handleSubmit, id: "createForm", className: "grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]" },
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "title", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "T\u00EAn c\u00F4ng vi\u1EC7c *"),
                React.createElement("input", { type: "text", name: "title", id: "title", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "salaryMin", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "M\u1EE9c l\u01B0\u01A1ng t\u1ED1i thi\u1EC3u ($)"),
                React.createElement("input", { type: "number", name: "salaryMin", id: "salaryMin", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "salaryMax", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "M\u1EE9c l\u01B0\u01A1ng t\u1ED1i \u0111a ($)"),
                React.createElement("input", { type: "number", name: "salaryMax", id: "salaryMax", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "position", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "C\u1EA5p b\u1EADc *"),
                React.createElement("select", { name: "position", id: "position", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" }, variable_1.positionList.map(function (item, index) { return (React.createElement("option", { key: index, value: item.value }, item.label)); }))),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "workingForm", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "H\u00ECnh th\u1EE9c l\u00E0m vi\u1EC7c *"),
                React.createElement("select", { name: "workingForm", id: "workingForm", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" }, variable_1.workingFormList.map(function (item, index) { return (React.createElement("option", { key: index, value: item.value }, item.label)); }))),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "technologies", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "C\u00E1c c\u00F4ng ngh\u1EC7"),
                React.createElement("input", { type: "text", name: "technologies", id: "technologies", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "images", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Danh s\u00E1ch \u1EA3nh"),
                React.createElement(react_filepond_1.FilePond, { name: "images", allowMultiple: true, allowRemove: true, labelIdle: '+', acceptedFileTypes: ["image/*"], files: images, onupdatefiles: setImages })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { htmlFor: "description", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "M\u00F4 t\u1EA3 chi ti\u1EBFt"),
                React.createElement(EditorMCE_1.EditorMCE, { editorRef: editorRef, id: "description" })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("button", { className: "bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white" }, "T\u1EA1o m\u1EDBi")))));
};
