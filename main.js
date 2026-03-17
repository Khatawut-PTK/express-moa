import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { 
    requestLogger, 
    errorLogger 
} from './src/middleware/logger.js';
import userRouter from "./src/routers/userRoute.js";


dotenv.config();
const app = express();

// ใช้ CORS middleware เพื่ออนุญาตการเข้าถึงจากโดเมนอื่น
app.use(cors()); 
app.use(express.json());

// ใช้ Logger middleware สำหรับบันทึกข้อมูลการร้องขอ
app.use(requestLogger); 

// ใช้ Router สำหรับจัดการเส้นทางของผู้ใช้
app.use('/users', userRouter);

// ใช้ Logger middleware สำหรับบันทึกข้อมูลข้อผิดพลาด
app.use(errorLogger); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});