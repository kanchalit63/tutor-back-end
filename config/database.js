// db.js

const mysql = require('mysql');

// Function to connect to the database
function connectToDatabase() {
    const db = mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "",
        database: "db_tutorlist"
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
    });

    // Close the database connection when the Node.js process ends
    process.on('SIGINT', () => {
        db.end((err) => {
            if (err) {
                console.error('Error closing the database connection:', err);
            } else {
                console.log('Database connection closed');
            }
            process.exit();
        });
    });

    return db;
}

module.exports = {
    connectToDatabase
};
