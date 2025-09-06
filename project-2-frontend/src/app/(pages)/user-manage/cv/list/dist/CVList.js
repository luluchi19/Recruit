/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
"use strict";
exports.__esModule = true;
exports.CVList = void 0;
var variable_1 = require("@/config/variable");
var link_1 = require("next/link");
var react_1 = require("react");
var fa6_1 = require("react-icons/fa6");
exports.CVList = function () {
    var _a = react_1.useState([]), listCV = _a[0], setListCV = _a[1];
    react_1.useEffect(function () {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/user/cv/list", {
            method: "GET",
            credentials: "include"
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "success") {
                setListCV(data.listCV);
            }
        });
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]" }, listCV.map(function (item) {
            var _a, _b;
            item.jobPosition = (_a = variable_1.positionList.find(function (itemPos) { return itemPos.value == item.jobPosition; })) === null || _a === void 0 ? void 0 : _a.label;
            item.jobWorkingForm = (_b = variable_1.workingFormList.find(function (itemWork) { return itemWork.value == item.jobWorkingForm; })) === null || _b === void 0 ? void 0 : _b.label;
            var status = variable_1.cvStatusList.find(function (itemStatus) { return itemStatus.value == item.status; });
            return (React.createElement("div", { key: item.id, className: "border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate", style: {
                    background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
                } },
                React.createElement("img", { src: "/assets/images/card-bg.svg", alt: "", className: "absolute top-[0px] left-[0px] w-[100%] h-auto" }),
                React.createElement("h3", { className: "mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2" }, item.jobTitle),
                React.createElement("div", { className: "mt-[12px] text-center font-[400] text-[14px] text-black" },
                    "C\u00F4ng ty: ",
                    React.createElement("span", { className: "font-[700]" }, item.companyName)),
                React.createElement("div", { className: "mt-[6px] text-center font-[600] text-[16px] text-[#0088FF]" },
                    item.jobSalaryMin.toLocaleString("vi-VN"),
                    "$ - ",
                    item.jobSalaryMax.toLocaleString("vi-VN"),
                    "$"),
                React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]" },
                    React.createElement(fa6_1.FaUserTie, { className: "text-[16px]" }),
                    " ",
                    item.jobPosition),
                React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]" },
                    React.createElement(fa6_1.FaBriefcase, { className: "text-[16px]" }),
                    " ",
                    item.jobWorkingForm),
                React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px]", style: {
                        color: status === null || status === void 0 ? void 0 : status.color
                    } },
                    React.createElement(fa6_1.FaCircleCheck, { className: "text-[16px]" }),
                    " ", status === null || status === void 0 ? void 0 :
                    status.label),
                React.createElement("div", { className: "flex flex-wrap items-center justify-center gap-[8px] mt-[12px] mb-[20px] mx-[10px]" },
                    React.createElement(link_1["default"], { href: "/user-manage/cv/detail/" + item.id, className: "bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]" }, "Xem"),
                    React.createElement(link_1["default"], { href: "#", className: "bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]" }, "X\u00F3a"))));
        })),
        React.createElement("div", { className: "mt-[30px]" },
            React.createElement("select", { name: "", className: "border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]" },
                React.createElement("option", { value: "" }, "Trang 1"),
                React.createElement("option", { value: "" }, "Trang 2"),
                React.createElement("option", { value: "" }, "Trang 3")))));
};
