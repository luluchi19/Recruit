/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use strict";
exports.__esModule = true;
exports.CVList = void 0;
var variable_1 = require("@/config/variable");
var react_1 = require("react");
var CVItem_1 = require("./CVItem");
exports.CVList = function () {
    var _a = react_1.useState([]), listCV = _a[0], setListCV = _a[1];
    var _b = react_1.useState(1), page = _b[0], setPage = _b[1];
    var _c = react_1.useState(), totalPage = _c[0], setTotalPage = _c[1];
    var _d = react_1.useState(), totalRecord = _d[0], setTotalRecord = _d[1];
    react_1.useEffect(function () {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/company/cv/list?page=" + page, {
            method: "GET",
            credentials: "include"
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.code == "success") {
                setListCV(data.listCV);
                setTotalPage(data.totalPage);
                setTotalRecord(data.totalRecord);
            }
        });
    }, [page]);
    var handleDeleteSuccess = function (id) {
        setListCV(function (prev) { return prev.filter(function (cv) { return cv.id !== id; }); });
    };
    var handlePagination = function (event) {
        var value = event.target.value;
        setPage(parseInt(value));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]" }, listCV.map(function (item) {
            var _a, _b;
            item.jobPosition = (_a = variable_1.positionList.find(function (itemPos) { return itemPos.value == item.jobPosition; })) === null || _a === void 0 ? void 0 : _a.label;
            item.jobWorkingForm = (_b = variable_1.workingFormList.find(function (itemWork) { return itemWork.value == item.jobWorkingForm; })) === null || _b === void 0 ? void 0 : _b.label;
            return (React.createElement(CVItem_1.CVItem, { key: item.id, item: item, onDeleteSuccess: handleDeleteSuccess }));
        })),
        totalPage && (React.createElement("div", { className: "mt-[30px]" },
            React.createElement("select", { name: "", className: "border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]", onChange: handlePagination }, Array(totalPage).fill("").map(function (item, index) { return (React.createElement("option", { key: index, value: index + 1 },
                "Trang ",
                index + 1)); }))))));
};
