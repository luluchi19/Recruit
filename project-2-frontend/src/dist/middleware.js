"use strict";
exports.__esModule = true;
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(request) {
    var _a;
    var token = (_a = request.cookies.get("token")) === null || _a === void 0 ? void 0 : _a.value;
    if (token) {
        return server_1.NextResponse.next();
    }
    else {
        return server_1.NextResponse.redirect(new URL('/', request.url));
    }
}
exports.middleware = middleware;
exports.config = {
    matcher: [
        '/user-manage/:path*',
        '/company-manage/:path*',
    ]
};
