const mysql = require('mysql2');

// --- ΣΗΜΑΝΤΙΚΟ: ΑΓΝΟΟΥΜΕ ΤΟ .ENV ΚΑΙ ΒΑΖΟΥΜΕ ΤΑ ΣΤΟΙΧΕΙΑ "ΚΑΡΦΩΤΑ" ---
console.log("--> CONNECTING WITH HARDCODED CREDENTIALS <--");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'apo12apo',  // <--- Ο ΚΩΔΙΚΟΣ ΣΟΥ (Σιγουρέψου ότι είναι σωστός)
    database: 'expensetrackerdb',
    port: 3306,
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