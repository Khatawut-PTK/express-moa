import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/database.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, position, username, password } = req.body;

        const sqlCheck = "SELECT * FROM users WHERE username = ?";
        const [rows] = await db.execute(sqlCheck, [username]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "ชื่อผู้ใช้ถูกใช้งานแล้ว" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (firstName, lastName, position, username, password) VALUES (?, ?, ?, ?, ?)";
        await db.execute(sql, [firstName, lastName, position, username, hashedPassword]);
        
        return res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการสมัครสมาชิก" });
    }
};

export const login = async (req, res) => {
    const { userName, password } = req.body;

    const sql = "SELECT * FROM users WHERE userName = ?";
    const [rows] = await db.execute(sql, [userName]);

    if (rows.length === 0) {
        return res.status(400).json({ message: "ไม่พบผู้ใช้" });
    }

    const user = rows[0];

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "รหัสผ่านผิด" });

    const token = jwt.sign(
        { userName: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
        { userName: user.userName },
        process.env.REFRESH_JWT_SECRET,
        { expiresIn: "7d" }
    );

    const payload = { 
        userName: user.userName, 
        fullName: user.fullName, 
        position: user.position,
        role: user.role, 
        createdAt: user.createdAt 
    };

    res.status(200).json({
        total: "success",
        message: "ล็อกอินสำเร็จ",
        user: {
            ...payload
        },
        token,
        refreshToken
    });
};

export const logout = (req, res) => {
    res.status(200).json({ message: "ออกจากระบบแล้ว - ให้ client ลบ token เอง" });
};
