import { db } from '../config/database.js';
import { userQueries } from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const getAllUsersService = async () => {
    const [rows] = await db.execute(userQueries.getAll);
    return rows;
};

// export const getUserByIdService = async (userId) => {
//     const [rows] = await db.execute(userQueries.getById, [userId]);
//     return rows[0];
// };

export const createUserService = async (userData) => {
    const { userName, password, fullName, position, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.execute(
        userQueries.create, 
        [userName, hashedPassword, fullName, position, role]
    );

    return result;
};

// export const updateUserPutService = async (id, data) => {
//     const {
//         firstName,
//         lastName,
//         position,
//         status = 1
//     } = data;
//     const [result] = await db.execute(
//         userQueries.updatePut,
//         [firstName, lastName, position, status, id]
//     );
//     return result;
// };

// export const updateUserPatchService = async (userId, data) => {
//     const fields = [];
//     const values = [];

//     for (const [key, value] of Object.entries(data)) {
//         if (key === 'password') {
//             const hashedPassword = await bcrypt.hash(value, 10);
//             fields.push('password = ?');
//             values.push(hashedPassword);
//         } else {
//             fields.push(`${key} = ?`);
//             values.push(value);
//         }
//     }

//     if (fields.length === 0) {
//         return { affectedRows: 0 };
//     }

//     const sql = `
//         UPDATE users
//         SET ${fields.join(', ')}
//         WHERE id = ?
//     `;

//     values.push(userId);
//     const [result] = await db.execute(sql, values);
//     return result;
// };

export const deleteUserService = async (userId) => {
    const result = await db.execute(userQueries.delete, [userId]);
    return result;
};