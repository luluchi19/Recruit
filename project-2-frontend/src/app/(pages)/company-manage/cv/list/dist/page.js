"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var CVList_1 = require("./CVList");
exports.metadata = {
    title: "Quản lý CV",
    description: "Mô tả trang quản lý CV..."
};
function CompanyManageCVListPage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("h2", { className: "font-[700] sm:text-[28px] text-[24px] sm:w-auto w-[100%] text-[#121212] mb-[20px]" }, "Qu\u1EA3n l\u00FD CV"),
                React.createElement(CVList_1.CVList, null)))));
}
exports["default"] = CompanyManageCVListPage;
