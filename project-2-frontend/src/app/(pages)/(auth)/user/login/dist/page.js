"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var FormLogin_1 = require("./FormLogin");
exports.metadata = {
    title: "Đăng nhập (Ứng viên)",
    description: "Mô tả trang đăng nhập (Ứng viên)..."
};
function UserLoginPage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("div", { className: "border border-[#DEDEDE] rounded-[8px] py-[50px] px-[20px] max-w-[602px] mx-auto" },
                    React.createElement("h1", { className: "font-[700] text-[20px] text-black text-center mb-[20px]" }, "\u0110\u0103ng nh\u1EADp (\u1EE8ng vi\u00EAn)"),
                    React.createElement(FormLogin_1.FormLogin, null))))));
}
exports["default"] = UserLoginPage;
