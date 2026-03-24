import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 100, // จำกัดจำนวนการร้องขอไม่เกิน 100 ครั้งต่อ 15 นาที
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

export default limiter;