import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import limiter from './src/middleware/rateLimit.js';
import cors from './src/middleware/cors.js';
import { requestLogger, errorLogger } from './src/middleware/logger.js';
import userRouter from "./src/routers/userRouter.js";
import authRoutes from "./src/routers/authRouter.js";

dotenv.config();
const app = express();

// ใช้ Helmet middleware เพื่อเพิ่มความปลอดภัย
app.use(helmet());

// ใช้ Rate Limit middleware เพื่อจำกัดจำนวนการร้องขอ
app.use(limiter);

// ใช้ CORS middleware เพื่ออนุญาตการเข้าถึงจากโดเมนอื่น
app.use(cors); 
app.use(express.json());

// ใช้ Logger middleware สำหรับบันทึกข้อมูลการร้องขอ
app.use(requestLogger); 

app.use('/users', userRouter);
app.use('/auth', authRoutes);

// ใช้ Logger middleware สำหรับบันทึกข้อมูลข้อผิดพลาด
app.use(errorLogger); 

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});