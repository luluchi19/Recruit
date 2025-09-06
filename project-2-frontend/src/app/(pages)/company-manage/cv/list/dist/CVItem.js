"use strict";
exports.__esModule = true;
exports.CVItem = void 0;
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
var ButtonDelete_1 = require("@/app/components/button/ButtonDelete");
var variable_1 = require("@/config/variable");
var link_1 = require("next/link");
var react_1 = require("react");
var fa6_1 = require("react-icons/fa6");
exports.CVItem = function (props) {
    var item = props.item, onDeleteSuccess = props.onDeleteSuccess;
    var statusDefault = variable_1.cvStatusList.find(function (itemStatus) { return itemStatus.value == item.status; });
    var _a = react_1.useState(statusDefault), status = _a[0], setStatus = _a[1];
    var handleChangeStatus = function (action) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/company/cv/change-status", {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: action,
                id: item.id
            })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "success") {
                var newStatus = variable_1.cvStatusList.find(function (itemStatus) { return itemStatus.value == action; });
                setStatus(newStatus);
            }
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate", style: {
                background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
            } },
            React.createElement("img", { src: "/assets/images/card-bg.svg", alt: "", className: "absolute top-[0px] left-[0px] w-[100%] h-auto" }),
            React.createElement("h3", { className: "mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2" }, item.jobTitle),
            React.createElement("div", { className: "mt-[12px] text-center font-[400] text-[14px] text-black" },
                "\u1EE8ng vi\u00EAn: ",
                React.createElement("span", { className: "font-[700]" }, item.fullName)),
            React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]" },
                React.createElement(fa6_1.FaEnvelope, { className: "" }),
                " ",
                item.email),
            React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]" },
                React.createElement(fa6_1.FaPhone, { className: "" }),
                " ",
                item.phone),
            React.createElement("div", { className: "mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]" },
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
            React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] "
                    + (item.viewed ? "text-[#121212]" : "text-[#FF0000]") },
                React.createElement(fa6_1.FaEye, { className: "text-[16px]" }),
                " ",
                item.viewed ? "Đã xem" : "Chưa xem"),
            React.createElement("div", { className: "mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px]", style: {
                    color: status === null || status === void 0 ? void 0 : status.color
                } },
                React.createElement(fa6_1.FaCircleCheck, { className: "text-[16px]" }),
                " ", status === null || status === void 0 ? void 0 :
                status.label),
            React.createElement("div", { className: "flex flex-wrap items-center justify-center gap-[8px] mt-[12px] mb-[20px] mx-[10px]" },
                React.createElement(link_1["default"], { href: "/company-manage/cv/detail/" + item.id, className: "bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]" }, "Xem"),
                ((status === null || status === void 0 ? void 0 : status.value) == "initial" || (status === null || status === void 0 ? void 0 : status.value) == "rejected") && (React.createElement("button", { onClick: function () { return handleChangeStatus("approved"); }, className: "bg-[#9FDB7C] rounded-[4px] font-[400] text-[14px] text-black inline-block py-[8px] px-[20px]" }, "Duy\u1EC7t")),
                ((status === null || status === void 0 ? void 0 : status.value) == "initial" || (status === null || status === void 0 ? void 0 : status.value) == "approved") && (React.createElement("button", { onClick: function () { return handleChangeStatus("rejected"); }, className: "bg-[#FF5100] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]" }, "T\u1EEB ch\u1ED1i")),
                React.createElement(ButtonDelete_1.ButtonDelete, { api: process.env.NEXT_PUBLIC_API_URL + "/company/cv/delete/" + item.id, item: item, onDeleteSuccess: onDeleteSuccess })))));
};
