"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var CompanyList_1 = require("./CompanyList");
exports.metadata = {
    title: "Danh sách công ty",
    description: "Mô tả trang danh sách công ty..."
};
function CompanyListPage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("h2", { className: "font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]" }, "Danh s\u00E1ch c\u00F4ng ty IT"),
                React.createElement(CompanyList_1.CompanyList, null)))));
}
exports["default"] = CompanyListPage;
