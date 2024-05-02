const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();

const registerTutor = (tutorData, callback) => {
    const { username, password, firstname, lastname,image, tel, address, description, document, status } = tutorData;
    db.query(
        "INSERT INTO tutors (username, password, firstname, lastname,image, tel, address, description, document, status) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?)",
        [username, password, firstname, lastname,image, tel, address, description, document, status],
        (err, result) => {
            callback(err, result);
        }
    );
};




const selectUserRegis = (username, callback) => {
    db.query("SELECT username FROM users WHERE username = ?", [username], (err, result) => {
        callback(err, result.length === 0);
    });
};

const registerUser = (userData, callback) => {
    selectUserRegis(userData.username, (err, ifHasUser) => {
        if (ifHasUser) {
            db.query(
                "INSERT INTO users (username,password,firstname,lastname,tel,email) VALUES (?,?,?,?,?,?)",
                [...Object.values(userData)],
                (err, result) => {
                    callback(err, result);
                }
            );
        } else {
            callback(true);
        }
    });
};





module.exports = {
    registerTutor,
    registerUser
};