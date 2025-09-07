"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    avatar: String,
    phone: String
}, {
    timestamps: true, // Tự động sinh ra trường createdAt và updatedAt
});
const AccountUser = mongoose_1.default.model('AccountUser', schema, "accounts-user");
exports.default = AccountUser;
