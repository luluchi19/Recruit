"use strict";
exports.__esModule = true;
exports.ButtonDelete = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var sonner_1 = require("sonner");
exports.ButtonDelete = function (props) {
    var api = props.api, item = props.item, onDeleteSuccess = props.onDeleteSuccess;
    var handleDelete = function () {
        var confirm = window.confirm("Bạn có chắc muốn xóa bản ghi: " + (item.title || item.jobTitle));
        if (confirm) {
            fetch(api, {
                method: "DELETE",
                credentials: "include"
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                if (data.code == "error") {
                    sonner_1.toast.error(data.message);
                }
                if (data.code == "success") {
                    sonner_1.toast.success(data.message);
                    onDeleteSuccess(item.id);
                }
            });
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(sonner_1.Toaster, { position: "top-right", richColors: true }),
        React.createElement("button", { className: "bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]", onClick: handleDelete }, "X\u00F3a")));
};
