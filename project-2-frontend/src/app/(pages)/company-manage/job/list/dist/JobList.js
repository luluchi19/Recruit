/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use strict";
exports.__esModule = true;
exports.JobList = void 0;
var ButtonDelete_1 = require("@/app/components/button/ButtonDelete");
var variable_1 = require("@/config/variable");
var link_1 = require("next/link");
var react_1 = require("react");
var fa6_1 = require("react-icons/fa6");
/* eslint-disable @next/next/no-img-element */
exports.JobList = function () {
    var _a = react_1.useState([]), jobList = _a[0], setJobList = _a[1];
    var _b = react_1.useState(1), page = _b[0], setPage = _b[1];
    var _c = react_1.useState(), totalPage = _c[0], setTotalPage = _c[1];
    react_1.useEffect(function () {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/company/job/list?page=" + page, {
            method: "GET",
            credentials: "include"
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "success") {
                setJobList(data.jobs);
                setTotalPage(data.totalPage);
            }
        });
    }, [page]);
    var handlePagination = function (event) {
        var value = event.target.value;
        setPage(parseInt(value));
    };
    var handleDeleteSuccess = function (id) {
        setJobList(function (prev) { return prev.filter(function (job) { return job.id !== id; }); });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]" }, jobList.map(function (item) {
            var _a, _b;
            var position = (_a = variable_1.positionList.find(function (itemPos) { return itemPos.value == item.position; })) === null || _a === void 0 ? void 0 : _a.label;
            var workingForm = (_b = variable_1.workingFormList.find(function (itemWork) { return itemWork.value == item.workingForm; })) === null || _b === void 0 ? void 0 : _b.label;
            return (React.createElement("div", { key: item.id, className: "border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate", style: {
                    background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
                } },
                React.createElement("img", { src: "/assets/images/card-bg.svg", alt: "", className: "absolute top-[0px] left-[0px] w-[100%] h-auto" }),
                React.createElement("div", { className: "relative mt-[20px] w-[116px] h-[116px] bg-white mx-auto rounded-[8px] p-[10px]", style: {
                        boxShadow: "0px 4px 24px 0px #0000001F"
                    } },
                    React.createElement("img", { src: item.companyLogo, alt: item.title, className: "w-[100%] h-[100%] object-contain" })),
                React.createElement("h3", { className: "mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2" }, item.title),
                React.createElement("div", { className: "mt-[6px] text-center font-[400] text-[14px] text-[#121212]" }, item.companyName),
                React.createElement("div", { className: "mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]" },
                    item.salaryMin.toLocaleString("vi-VN"),
                    "$ - ",
                    item.salaryMax.toLocaleString("vi-VN"),
                    "$"),
                React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]" },
                    React.createElement(fa6_1.FaUserTie, { className: "text-[16px]" }),
                    " ",
                    position),
                React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]" },
                    React.createElement(fa6_1.FaBriefcase, { className: "text-[16px]" }),
                    " ",
                    workingForm),
                React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]" },
                    React.createElement(fa6_1.FaLocationDot, { className: "text-[16px]" }),
                    " ",
                    item.companyCity),
                React.createElement("div", { className: "mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]" }, item.technologies.map(function (itemTech, indexTech) { return (React.createElement("div", { key: indexTech, className: "border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]" }, itemTech)); })),
                React.createElement("div", { className: "flex items-center justify-center gap-[12px] mb-[20px]" },
                    React.createElement(link_1["default"], { href: "/company-manage/job/edit/" + item.id, className: "bg-[#FFB200] rounded-[4px] font-[400] text-[14px] text-black inline-block py-[8px] px-[20px]" }, "S\u1EEDa"),
                    React.createElement(ButtonDelete_1.ButtonDelete, { api: process.env.NEXT_PUBLIC_API_URL + "/company/job/delete/" + item.id, item: item, onDeleteSuccess: handleDeleteSuccess }))));
        })),
        totalPage && (React.createElement("div", { className: "mt-[30px]" },
            React.createElement("select", { name: "", className: "border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]", onChange: handlePagination }, Array(totalPage).fill("").map(function (item, index) { return (React.createElement("option", { key: index, value: index + 1 },
                "Trang ",
                index + 1)); }))))));
};
