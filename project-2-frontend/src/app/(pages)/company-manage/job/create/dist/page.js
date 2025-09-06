"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var link_1 = require("next/link");
var FormCreate_1 = require("./FormCreate");
exports.metadata = {
    title: "Thêm mới công việc",
    description: "Mô tả trang thêm mới công việc..."
};
function CompanyManageJobCreatePage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement("div", { className: "container mx-auto px-[16px]" },
                React.createElement("div", { className: "border border-[#DEDEDE] rounded-[8px] p-[20px]" },
                    React.createElement("div", { className: "flex flex-wrap gap-[20px] items-center justify-between mb-[20px]" },
                        React.createElement("h1", { className: "sm:w-auto w-[100%] font-[700] text-[20px] text-black" }, "Th\u00EAm m\u1EDBi c\u00F4ng vi\u1EC7c"),
                        React.createElement(link_1["default"], { href: "/company-manage/job/list", className: "font-[400] text-[14px] text-[#0088FF] underline" }, "Quay l\u1EA1i danh s\u00E1ch")),
                    React.createElement(FormCreate_1.FormCreate, null))))));
}
exports["default"] = CompanyManageJobCreatePage;
