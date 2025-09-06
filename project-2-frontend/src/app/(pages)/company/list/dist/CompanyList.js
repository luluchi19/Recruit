/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use strict";
exports.__esModule = true;
exports.CompanyList = void 0;
var CardCompanyItem_1 = require("@/app/components/card/CardCompanyItem");
var react_1 = require("react");
exports.CompanyList = function () {
    var _a = react_1.useState([]), companyList = _a[0], setCompanyList = _a[1];
    var _b = react_1.useState(1), page = _b[0], setPage = _b[1];
    var _c = react_1.useState(), totalPage = _c[0], setTotalPage = _c[1];
    react_1.useEffect(function () {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/company/list?limitItems=2&page=" + page)
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "success") {
                setCompanyList(data.companyList);
                setTotalPage(data.totalPage);
            }
        });
    }, [page]);
    var handlePagination = function (event) {
        var value = event.target.value;
        setPage(parseInt(value));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]" }, companyList.map(function (item) { return (React.createElement(CardCompanyItem_1.CardCompanyItem, { key: item.id, item: item })); })),
        totalPage && (React.createElement("div", { className: "mt-[30px]" },
            React.createElement("select", { name: "", className: "border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]", onChange: handlePagination }, Array(totalPage).fill("").map(function (item, index) { return (React.createElement("option", { key: index, value: index + 1 },
                "Trang ",
                index + 1)); }))))));
};
