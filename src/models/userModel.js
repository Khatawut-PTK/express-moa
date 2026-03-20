export const userSchema = {
    id: 'INT PRIMARY KEY AUTO_INCREMENT',
    userName: 'VARCHAR(50) NOT NULL',
    password: 'VARCHAR(255) NOT NULL',
    fullName: 'VARCHAR(100) NOT NULL',
    position: 'VARCHAR(100)',
    role : 'VARCHAR(50) NOT NULL',
    status: 'INT DEFAULT 1',
    createAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};


export const userQueries = {
    getAll: `
        SELECT id, userName, fullName, position, role, status, createAt 
        FROM users
    `,
    getById: `
        SELECT id, userName, fullName, position, role, status, createAt
        FROM users WHERE id = ?
    `,
    create: `
        INSERT INTO users (userName, password, fullName, position, role, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `,
    updatePut: `
        UPDATE users 
        SET userName = ?, fullName = ?, position = ?, role = ?, status = ?
        WHERE id = ?
    `,
    updatePatchBase: `UPDATE users SET `,
    delete: `DELETE FROM users WHERE id = ?`
};
