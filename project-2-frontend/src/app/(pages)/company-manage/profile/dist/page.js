"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var FormProfile_1 = require("./FormProfile");
exports.metadata = {
    title: "Thông tin công ty",
    description: "Mô tả trang thông tin công ty..."
};
function CompanyManageProfilePage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("div", { className: "border border-[#DEDEDE] rounded-[8px] p-[20px]" },
                    React.createElement("h1", { className: "font-[700] text-[20px] text-black mb-[20px]" }, "Th\u00F4ng tin c\u00F4ng ty"),
                    React.createElement(FormProfile_1.FormProfile, null))))));
}
exports["default"] = CompanyManageProfilePage;
