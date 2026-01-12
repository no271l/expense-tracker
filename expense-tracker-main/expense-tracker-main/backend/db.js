require('dotenv').config();
const mysql = require('mysql2');

console.log("--> CONNECTING TO DB (using env vars / defaults) <--");

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'apo12apo',
    database: process.env.DB_NAME || 'expensetrackerdb',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Ελέγχουμε αν υπάρχει λάθος στη σύνδεση
pool.getConnection((err, connection) => {
    if (err) {
        console.error("!!! DB CONNECTION FAILED !!!");
        console.error(err.message);
    } else {
        console.log("✅ DB CONNECTION SUCCESSFUL!");
        connection.release();
    }
});

module.exports = pool.promise();