"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const cookieParser = require("cookie-parser");
// Load biến môi trường
dotenv_1.default.config();
const app = express_1.default();
console.log(`PORT from environment: ${process.env.PORT}`);
const port = process.env.PORT || 3000;
// Kết nối DB
database_1.connectDB();
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running' });
});
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Recruitment API' });
});
// Cấu hình CORS
const allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || [
    'http://localhost:3000',
    'https://RecruitonProduction-frontend-env.ap-southeast-2.elasticbeanstalk.com',
];
app.use(cors_1.default({
    origin: (origin, callback) => {
        // Cho phép request không có origin (như Postman) hoặc origin trong danh sách
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Cho phép gửi cookie
}));
// Cho phép gửi data lên dạng json
app.use(express_1.default.json());
// Cấu hình lấy cookie
app.use(cookieParser());
// Thiết lập đường dẫn
app.use("/", index_route_1.default);
app.listen(port, () => {
    console.log(`Website đang chạy trên cổng ${port}`);
});
