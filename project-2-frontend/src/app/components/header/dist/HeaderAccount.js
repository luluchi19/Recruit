"use strict";
exports.__esModule = true;
exports.HeaderAccount = void 0;
var useAuth_1 = require("@/hooks/useAuth");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
exports.HeaderAccount = function () {
    var _a = useAuth_1.useAuth(), isLogin = _a.isLogin, infoUser = _a.infoUser, infoCompany = _a.infoCompany;
    var router = navigation_1.useRouter();
    var handleLogout = function (linkRedirect) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", {
            credentials: "include"
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "success") {
                router.push(linkRedirect);
            }
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "inline-flex items-center gap-x-[5px] text-white font-[600] sm:text-[16px] text-[12px] relative group/sub-1" }, isLogin ? (React.createElement(React.Fragment, null,
            infoUser && (React.createElement(React.Fragment, null,
                React.createElement(link_1["default"], { href: "/user-manage/profile", className: "" }, infoUser.fullName),
                React.createElement("ul", { className: "absolute top-[100%] right-[0px] w-[200px] bg-[#000065] hidden group-hover/sub-1:block z-[999]" },
                    React.createElement("li", { className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2" },
                        React.createElement(link_1["default"], { href: "/user-manage/profile", className: "text-white font-[600] text-[16px]" }, "Th\u00F4ng tin c\u00E1 nh\u00E2n")),
                    React.createElement("li", { className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2" },
                        React.createElement(link_1["default"], { href: "/user-manage/cv/list", className: "text-white font-[600] text-[16px]" }, "Qu\u1EA3n l\u00FD CV \u0111\u00E3 g\u1EEDi")),
                    React.createElement("li", { className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2", onClick: function () { return handleLogout("/user/login"); } }, "\u0110\u0103ng xu\u1EA5t")))),
            infoCompany && (React.createElement(React.Fragment, null,
                React.createElement(link_1["default"], { href: "/company-manage/profile", className: "" }, infoCompany.companyName),
                React.createElement("ul", { className: "absolute top-[100%] right-[0px] w-[200px] bg-[#000065] hidden group-hover/sub-1:block z-[999]" },
                    React.createElement("li", { className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2" },
                        React.createElement(link_1["default"], { href: "/company-manage/profile", className: "text-white font-[600] text-[16px]" }, "Th\u00F4ng tin c\u00F4ng ty")),
                    React.createElement("li", { className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2" },
                        React.createElement(link_1["default"], { href: "/company-manage/job/list", className: "text-white font-[600] text-[16px]" }, "Qu\u1EA3n l\u00FD c\u00F4ng vi\u1EC7c")),
                    React.createElement("li", { className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2" },
                        React.createElement(link_1["default"], { href: "/company-manage/cv/list", className: "text-white font-[600] text-[16px]" }, "Qu\u1EA3n l\u00FD CV")),
                    React.createElement("li", { className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2 text-[16px]", onClick: function () { return handleLogout("/company/login"); } },
                        React.createElement(link_1["default"], { href: "", className: "text-white font-[600] text-[16px]" }, "\u0110\u0103ng xu\u1EA5t"))))))) : (React.createElement(React.Fragment, null,
            React.createElement(link_1["default"], { href: "/user/login", className: "" }, "\u0110\u0103ng Nh\u1EADp"),
            React.createElement("span", { className: "" }, "/"),
            React.createElement(link_1["default"], { href: "/user/register", className: "" }, "\u0110\u0103ng K\u00FD"))))));
};
