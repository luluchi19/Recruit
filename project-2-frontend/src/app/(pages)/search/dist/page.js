"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var SearchContainer_1 = require("./SearchContainer");
exports.metadata = {
    title: "Kết quả tìm kiếm",
    description: "Kết quả tìm kiếm công việc..."
};
function SearchPage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "py-[60px]" },
            React.createElement(SearchContainer_1.SearchContainer, null))));
}
exports["default"] = SearchPage;
