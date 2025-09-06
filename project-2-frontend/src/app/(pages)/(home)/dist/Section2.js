/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use strict";
exports.__esModule = true;
exports.Section2 = void 0;
var CardCompanyItem_1 = require("@/app/components/card/CardCompanyItem");
var react_1 = require("react");
exports.Section2 = function () {
    var _a = react_1.useState([]), companyList = _a[0], setCompanyList = _a[1];
    react_1.useEffect(function () {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/company/list?limitItems=9")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "success") {
                setCompanyList(data.companyList);
            }
        });
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("h2", { className: "font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]" }, "Nh\u00E0 tuy\u1EC3n d\u1EE5ng h\u00E0ng \u0111\u1EA7u"),
                React.createElement("div", { className: "grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]" }, companyList.map(function (item) { return (React.createElement(CardCompanyItem_1.CardCompanyItem, { key: item.id, item: item })); }))))));
};
