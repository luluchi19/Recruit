"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var link_1 = require("next/link");
var JobList_1 = require("./JobList");
exports.metadata = {
    title: "Quản lý công việc",
    description: "Mô tả trang quản lý công việc..."
};
function CompanyManageJobListPage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("div", { className: "flex flex-wrap gap-[20px] items-center justify-between mb-[20px]" },
                    React.createElement("h2", { className: "font-[700] sm:text-[28px] text-[24px] sm:w-auto w-[100%] text-[#121212]" }, "Qu\u1EA3n l\u00FD c\u00F4ng vi\u1EC7c"),
                    React.createElement(link_1["default"], { href: "/company-manage/job/create", className: "bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]" }, "Th\u00EAm m\u1EDBi")),
                React.createElement(JobList_1.JobList, null)))));
}
exports["default"] = CompanyManageJobListPage;
