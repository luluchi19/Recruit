"use strict";
exports.__esModule = true;
exports.EditorMCE = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var tinymce_react_1 = require("@tinymce/tinymce-react");
exports.EditorMCE = function (props) {
    var editorRef = props.editorRef, _a = props.value, value = _a === void 0 ? "" : _a, _b = props.id, id = _b === void 0 ? "" : _b;
    return (React.createElement(React.Fragment, null,
        React.createElement(tinymce_react_1.Editor, { apiKey: process.env.NEXT_PUBLIC_API_TINYMCE, onInit: function (_, editor) { return editorRef.current = editor; }, initialValue: value, init: {
                height: 500,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                images_upload_url: process.env.NEXT_PUBLIC_API_URL + "/upload/image"
            }, id: id })));
};
