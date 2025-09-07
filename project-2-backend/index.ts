import express from 'express';
import cors from "cors";
import routes from "./routes/index.route";
import dotenv from "dotenv";
import { connectDB } from './config/database';
import cookieParser = require('cookie-parser');

// Load biến môi trường
dotenv.config();

const app = express();
console.log(`PORT from environment: ${process.env.PORT}`);
const port = process.env.PORT || 3000;

// Kết nối DB
connectDB();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Recruitment API' });
});

// Cấu hình CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : [
      'http://localhost:3000',
      'https://recruit-9ij4r8zj9-nguyen-kim-truong-giangs-projects.vercel.app',
    ];

app.use(cors({
  origin: (origin, callback) => {
    console.log("Request origin:", origin);
    console.log("Allowed origins:", allowedOrigins);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Cho phép gửi data lên dạng json
app.use(express.json());

// Cấu hình lấy cookie
app.use(cookieParser());

// Thiết lập đường dẫn
app.use("/", routes);

app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});
