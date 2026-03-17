import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'system_moa'
});