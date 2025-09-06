"use strict";
exports.__esModule = true;
exports.useAuth = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = require("react");
var navigation_1 = require("next/navigation");
exports.useAuth = function () {
    var _a = react_1.useState(false), isLogin = _a[0], setIsLogin = _a[1];
    var _b = react_1.useState(), infoUser = _b[0], setInfoUser = _b[1];
    var _c = react_1.useState(), infoCompany = _c[0], setInfoCompany = _c[1];
    var pathname = navigation_1.usePathname(); // Lấy URL hiện tại
    react_1.useEffect(function () {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/check", {
            credentials: "include"
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "error") {
                setIsLogin(false);
            }
            if (data.code == "success") {
                setIsLogin(true);
                if (data.infoUser) {
                    setInfoUser(data.infoUser);
                    setInfoCompany(null);
                }
                if (data.infoCompany) {
                    setInfoCompany(data.infoCompany);
                    setInfoUser(null);
                }
            }
        });
    }, [pathname]);
    return { isLogin: isLogin, infoUser: infoUser, infoCompany: infoCompany };
};
