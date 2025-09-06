/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use strict";
exports.__esModule = true;
exports.FormLogin = void 0;
var react_1 = require("react");
var just_validate_1 = require("just-validate");
var navigation_1 = require("next/navigation");
exports.FormLogin = function () {
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        var validator = new just_validate_1["default"]("#loginForm");
        validator
            .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập email!'
            },
            {
                rule: 'email',
                errorMessage: 'Email không đúng định dạng!'
            },
        ])
            .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập mật khẩu!'
            },
            {
                validator: function (value) { return value.length >= 8; },
                errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!'
            },
            {
                validator: function (value) { return /[A-Z]/.test(value); },
                errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!'
            },
            {
                validator: function (value) { return /[a-z]/.test(value); },
                errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!'
            },
            {
                validator: function (value) { return /\d/.test(value); },
                errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!'
            },
            {
                validator: function (value) { return /[@$!%*?&]/.test(value); },
                errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!'
            },
        ])
            .onSuccess(function (event) {
            var email = event.target.email.value;
            var password = event.target.password.value;
            var dataFinal = {
                email: email,
                password: password
            };
            fetch(process.env.NEXT_PUBLIC_API_URL + "/company/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataFinal),
                credentials: "include"
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                if (data.code == "error") {
                    alert(data.message);
                }
                if (data.code == "success") {
                    router.push("/");
                }
            });
        });
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { id: "loginForm", action: "", className: "grid grid-cols-1 gap-y-[15px]" },
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "email", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "Email *"),
                React.createElement("input", { type: "email", name: "email", id: "email", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("label", { htmlFor: "password", className: "block font-[500] text-[14px] text-black mb-[5px]" }, "M\u1EADt kh\u1EA9u *"),
                React.createElement("input", { type: "password", name: "password", id: "password", className: "w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" })),
            React.createElement("div", { className: "" },
                React.createElement("button", { className: "bg-[#0088FF] rounded-[4px] w-[100%] h-[48px] px-[20px] font-[700] text-[16px] text-white" }, "\u0110\u0103ng nh\u1EADp")))));
};
