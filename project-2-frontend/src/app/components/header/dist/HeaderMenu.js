"use strict";
exports.__esModule = true;
exports.HeaderMenu = void 0;
var useAuth_1 = require("@/hooks/useAuth");
var link_1 = require("next/link");
var fa6_1 = require("react-icons/fa6");
exports.HeaderMenu = function (props) {
    var showMenu = props.showMenu;
    var isLogin = useAuth_1.useAuth().isLogin;
    var menuList = [
        {
            name: "Việc Làm IT",
            link: "#",
            children: [
                {
                    name: "Việc làm IT theo kỹ năng",
                    link: "#",
                    children: [
                        {
                            name: "HTML5",
                            link: "/search?language=HTML5",
                            children: null
                        },
                        {
                            name: "CSS3",
                            link: "/search?language=CSS3",
                            children: null
                        },
                        {
                            name: "Javascript",
                            link: "/search?language=Javascript",
                            children: null
                        },
                        {
                            name: "ReactJS",
                            link: "/search?language=ReactJS",
                            children: null
                        },
                        {
                            name: "NodeJS",
                            link: "/search?language=NodeJS",
                            children: null
                        }
                    ]
                },
                // {
                //   name: "Việc làm IT theo công ty",
                //   link: "#",
                //   children: null
                // },
                {
                    name: "Việc làm IT theo thành phố",
                    link: "#",
                    children: [
                        {
                            name: "Hà Nội",
                            link: "/search?city=Hà Nội",
                            children: null
                        },
                        {
                            name: "Đà Nẵng",
                            link: "/search?city=Đà Nẵng",
                            children: null
                        },
                        {
                            name: "Hồ Chí Minh",
                            link: "/search?city=Hồ Chí Minh",
                            children: null
                        },
                    ]
                }
            ]
        },
        {
            name: "Top Công Ty IT",
            link: "/company/list",
            children: [
                {
                    name: "FPT Software",
                    link: "/search?company=FPT Software",
                    children: null
                },
                {
                    name: "Techcombank",
                    link: "/search?company=Techcombank",
                    children: null
                },
                {
                    name: "MB Bank",
                    link: "/search?company=MB Bank",
                    children: null
                },
                {
                    name: "GTHN.LTD",
                    link: "/search?company=GTHN.LTD",
                    children: null
                }
            ]
        },
        {
            name: "Nhà Tuyển Dụng",
            link: "#",
            isLogin: false,
            children: [
                {
                    name: "Đăng Nhập",
                    link: "/company/login",
                    children: null
                },
                {
                    name: "Đăng Ký",
                    link: "/company/register",
                    children: null
                }
            ]
        }
    ];
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: "lg:block " + (showMenu ? "fixed top-0 left-0 w-[280px] h-[100vh] z-[999] bg-[#000056]" : "hidden") },
            React.createElement("ul", { className: "flex gap-x-[30px] flex-wrap" }, menuList.map(function (menu, index) { return (React.createElement("li", { key: index, className: "inline-flex lg:w-auto w-full lg:justify-start justify-between p-[10px] items-center gap-x-[8px] relative group/sub-1 flex-wrap " +
                    (menu.isLogin !== undefined && menu.isLogin !== isLogin ? "hidden" : "") },
                React.createElement(link_1["default"], { href: menu.link, className: "text-white font-[600] text-[16px]" }, menu.name),
                menu.children && (React.createElement(fa6_1.FaAngleDown, { className: "text-white text-[16px]" })),
                menu.children && (React.createElement("ul", { className: "lg:absolute relative lg:top-[100%] top-0 left-[0px] lg:w-[280px] w-full bg-[#000065] hidden group-hover/sub-1:block z-[999]" }, menu.children.map(function (menuSub1, indexSub1) { return (React.createElement("li", { key: indexSub1, className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2 flex-wrap" },
                    React.createElement(link_1["default"], { href: menuSub1.link, className: "text-white font-[600] text-[16px]" }, menuSub1.name),
                    menuSub1.children && (React.createElement(fa6_1.FaAngleRight, { className: "text-white text-[16px]" })),
                    menuSub1.children && (React.createElement("ul", { className: "lg:absolute relative top-[0px] lg:left-[100%] left-0 lg:w-[280px] w-full bg-[#000065] hidden group-hover/sub-2:block z-[999]" }, menuSub1.children.map(function (menuSub2, indexSub2) { return (React.createElement("li", { key: indexSub2, className: "py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096]" },
                        React.createElement(link_1["default"], { href: menuSub2.link, className: "text-white font-[600] text-[16px]" }, menuSub2.name))); }))))); }))))); })))));
};
