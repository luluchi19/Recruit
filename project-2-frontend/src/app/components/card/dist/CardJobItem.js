"use strict";
exports.__esModule = true;
exports.CardJobItem = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
var variable_1 = require("@/config/variable");
var link_1 = require("next/link");
var fa6_1 = require("react-icons/fa6");
exports.CardJobItem = function (props) {
    var _a, _b;
    var item = props.item;
    var position = (_a = variable_1.positionList.find(function (pos) { return pos.value === item.position; })) === null || _a === void 0 ? void 0 : _a.label;
    var workingForm = (_b = variable_1.workingFormList.find(function (work) { return work.value === item.workingForm; })) === null || _b === void 0 ? void 0 : _b.label;
    return (React.createElement(React.Fragment, null,
        React.createElement(link_1["default"], { href: "/job/detail/" + item.id, className: "border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate", style: {
                background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
            } },
            React.createElement("img", { src: "/assets/images/card-bg.svg", alt: "", className: "absolute top-[0px] left-[0px] w-[100%] h-auto" }),
            React.createElement("div", { className: "relative mt-[20px] w-[116px] h-[116px] bg-white mx-auto rounded-[8px] p-[10px]", style: {
                    boxShadow: "0px 4px 24px 0px #0000001F"
                } },
                React.createElement("img", { src: item.companyLogo, alt: item.companyName, className: "w-[100%] h-[100%] object-contain" })),
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
            React.createElement("div", { className: "mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]" }, item.technologies.map(function (itemTech, indexTech) { return (React.createElement("div", { className: "border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]", key: indexTech }, itemTech)); })))));
};
