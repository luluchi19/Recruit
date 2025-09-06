/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use strict";
exports.__esModule = true;
exports.SearchContainer = void 0;
var CardJobItem_1 = require("@/app/components/card/CardJobItem");
var variable_1 = require("@/config/variable");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
exports.SearchContainer = function () {
    var searchParams = navigation_1.useSearchParams();
    var router = navigation_1.useRouter();
    var language = searchParams.get("language") || "";
    var city = searchParams.get("city") || "";
    var company = searchParams.get("company") || "";
    var keyword = searchParams.get("keyword") || "";
    var position = searchParams.get("position") || "";
    var workingForm = searchParams.get("workingForm") || "";
    var _a = react_1.useState([]), jobList = _a[0], setJobList = _a[1];
    var _b = react_1.useState(1), page = _b[0], setPage = _b[1];
    var _c = react_1.useState(), totalPage = _c[0], setTotalPage = _c[1];
    var _d = react_1.useState(), totalRecord = _d[0], setTotalRecord = _d[1];
    react_1.useEffect(function () {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/search?language=" + language + "&city=" + city + "&company=" + company + "&keyword=" + keyword + "&position=" + position + "&workingForm=" + workingForm + "&page=" + page)
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "success") {
                setJobList(data.jobs);
                setTotalPage(data.totalPage);
                setTotalRecord(data.totalRecord);
            }
        });
    }, [language, city, company, keyword, position, workingForm, page]);
    console.log(jobList);
    var handleFilterPosition = function (event) {
        var value = event.target.value;
        var params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("position", value);
        }
        else {
            params["delete"]("position");
        }
        router.push("?" + params.toString());
    };
    var handleFilterWorkingForm = function (event) {
        var value = event.target.value;
        var params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("workingForm", value);
        }
        else {
            params["delete"]("workingForm");
        }
        router.push("?" + params.toString());
    };
    var handlePagination = function (event) {
        var value = event.target.value;
        setPage(parseInt(value));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container mx-auto px-[16px]" },
            totalRecord && (React.createElement("h2", { className: "font-[700] text-[28px] text-[#121212] mb-[30px]" },
                totalRecord,
                " vi\u1EC7c l\u00E0m:",
                React.createElement("span", { className: "text-[#0088FF] ml-[6px]" },
                    language,
                    " ",
                    city,
                    " ",
                    company,
                    " ",
                    keyword))),
            React.createElement("div", { className: "bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]", style: {
                    boxShadow: "0px 4px 20px 0px #0000000F"
                } },
                React.createElement("select", { name: "", className: "border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]", onChange: handleFilterPosition, defaultValue: position },
                    React.createElement("option", { value: "" }, "C\u1EA5p b\u1EADc"),
                    variable_1.positionList.map(function (item, index) { return (React.createElement("option", { key: index, value: item.value }, item.label)); })),
                React.createElement("select", { name: "", className: "border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]", onChange: handleFilterWorkingForm, defaultValue: workingForm },
                    React.createElement("option", { value: "" }, "H\u00ECnh th\u1EE9c l\u00E0m vi\u1EC7c"),
                    variable_1.workingFormList.map(function (item, index) { return (React.createElement("option", { key: index, value: item.value }, item.label)); }))),
            React.createElement("div", { className: "grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]" }, jobList.map(function (item) { return (React.createElement(CardJobItem_1.CardJobItem, { key: item.id, item: item })); })),
            totalPage && (React.createElement("div", { className: "mt-[30px]" },
                React.createElement("select", { name: "", className: "border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]", onChange: handlePagination }, Array(totalPage).fill("").map(function (item, index) { return (React.createElement("option", { key: index, value: index + 1 },
                    "Trang ",
                    index + 1)); })))))));
};
