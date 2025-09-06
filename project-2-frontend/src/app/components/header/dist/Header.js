"use client";
"use strict";
exports.__esModule = true;
exports.Header = void 0;
var link_1 = require("next/link");
var fa6_1 = require("react-icons/fa6");
var HeaderMenu_1 = require("./HeaderMenu");
var react_1 = require("react");
var HeaderAccount_1 = require("./HeaderAccount");
exports.Header = function () {
    var _a = react_1.useState(false), showMenu = _a[0], setShowMenu = _a[1];
    var handleShowMenu = function () {
        setShowMenu(!showMenu);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("header", { className: "bg-[#000071] py-[15px] px-[16px]" },
            React.createElement("div", { className: "container mx-auto" },
                React.createElement("div", { className: "flex items-center justify-between" },
                    React.createElement(link_1["default"], { href: "/", className: "text-white font-[800] sm:text-[28px] text-[20px] lg:flex-none flex-1" }, "28.ITJobs"),
                    React.createElement(HeaderMenu_1.HeaderMenu, { showMenu: showMenu }),
                    React.createElement(HeaderAccount_1.HeaderAccount, null),
                    React.createElement("button", { onClick: handleShowMenu, className: "text-white text-[20px] lg:hidden inline-block ml-[12px]" },
                        React.createElement(fa6_1.FaBars, { className: "" })))))));
};
