"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var FormRegister_1 = require("./FormRegister");
exports.metadata = {
    title: "Đăng ký (Nhà tuyển dụng)",
    description: "Mô tả trang đăng ký (Nhà tuyển dụng)..."
};
function CompanyRegisterPage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("div", { className: "border border-[#DEDEDE] rounded-[8px] py-[50px] px-[20px] max-w-[602px] mx-auto" },
                    React.createElement("h1", { className: "font-[700] text-[20px] text-black text-center mb-[20px]" }, "\u0110\u0103ng k\u00FD (Nh\u00E0 tuy\u1EC3n d\u1EE5ng)"),
                    React.createElement(FormRegister_1.FormRegister, null))))));
}
exports["default"] = CompanyRegisterPage;
