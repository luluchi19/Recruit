/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use strict";
exports.__esModule = true;
exports.Section1 = void 0;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var fa6_1 = require("react-icons/fa6");
exports.Section1 = function () {
    var router = navigation_1.useRouter(); // chuyển hướng trang mà không cần reload lại trang
    var handleSearch = function (event) {
        event.preventDefault();
        var city = event.target.city.value;
        var keyword = event.target.keyword.value;
        router.push("/search?city=" + city + "&keyword=" + keyword);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-[#000065] py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("h1", { className: "text-white font-[700] text-[28px] text-center mb-[30px]" }, "887 Vi\u1EC7c l\u00E0m IT cho Developer \"Ch\u1EA5t\""),
                React.createElement("form", { onSubmit: handleSearch, action: "", className: "flex flex-wrap gap-x-[15px] gap-y-[12px] mb-[30px]" },
                    React.createElement("select", { name: "city", className: "bg-white md:w-[240px] w-[100%] h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px] text-[#121212]" },
                        React.createElement("option", { value: "" }, "T\u1EA5t c\u1EA3 th\u00E0nh ph\u1ED1"),
                        React.createElement("option", { value: "H\u00E0 N\u1ED9i" }, "H\u00E0 N\u1ED9i"),
                        React.createElement("option", { value: "\u0110\u00E0 N\u1EB5ng" }, "\u0110\u00E0 N\u1EB5ng"),
                        React.createElement("option", { value: "H\u1ED3 Ch\u00ED Minh" }, "H\u1ED3 Ch\u00ED Minh")),
                    React.createElement("input", { type: "text", name: "keyword", placeholder: "Nh\u1EADp t\u1EEB kho\u00E1...", className: "md:flex-1 flex-none w-[100%] bg-white h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px]" }),
                    React.createElement("button", { className: "bg-[#0088FF] md:w-[240px] w-[100%] h-[56px] rounded-[4px] font-[500] text-[16px] text-white inline-flex items-center justify-center" },
                        React.createElement(fa6_1.FaMagnifyingGlass, { className: "text-[20px] mr-[10px]" }),
                        " T\u00ECm Ki\u1EBFm")),
                React.createElement("div", { className: "flex flex-wrap gap-x-[12px] gap-y-[15px] items-center" },
                    React.createElement("div", { className: "text-[#DEDEDE] font-[500] text-[16px]" }, "M\u1ECDi ng\u01B0\u1EDDi \u0111ang t\u00ECm ki\u1EBFm:"),
                    React.createElement("div", { className: "flex flex-wrap gap-[10px]" },
                        React.createElement(link_1["default"], { href: "/search?language=ReactJS", className: "border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]" }, "ReactJS"),
                        React.createElement(link_1["default"], { href: "/search?language=Javascript", className: "border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]" }, "Javascript"),
                        React.createElement(link_1["default"], { href: "/search?language=NodeJS", className: "border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px]" }, "NodeJS")))))));
};
