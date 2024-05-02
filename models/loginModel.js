const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.JWT_SECRETKEY

const loginAdmin = (adminData, callback) => {
    db.query("SELECT * FROM admin WHERE username = ? AND password = ?", [adminData.username, adminData.password], (err, result) => {
        if (err) {
            return callback(err, null, null);
        }

        if (result.length === 0) {
            return callback(null, false, null);
        }

        const token = jwt.sign({ 
            id: result[0].id, 
            username: result[0].username, 
            role: 'admin' 
        }, secret, { expiresIn: '1h' });

        return callback(null, true, token);
    });
};






const loginTutor = (tutorData, callback) => {
    db.query("SELECT * FROM tutors WHERE username = ? && status = 2", [tutorData.username], (err, result) => {
        if (err) {
            return callback(err, null, null);
        }

        if (result.length === 0) {
            return callback(null, false, null);
        }

        const hashedPassword = result[0].password;

        bcrypt.compare(tutorData.password, hashedPassword, (err, res) => {
            if (err) {
                return callback(bcryptErr, null, null);
            }
            if (res) {
                const token = jwt.sign({ id: result[0].id, username: result[0].username, firstname: result[0].firstname, role: 'tutor' }, secret, { expiresIn: '1h' });
                return callback(null, true, token);
            } else {
                return callback(null, false, null);
            }
        });
    })
}


const loginUser = (userData, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [userData.username], (err, result) => {
        if (err) {
            return callback(err, null, null);
        }

        if (result.length === 0) {
            return callback(null, false, null);
        }

        const hashedPassword = result[0].password;

        bcrypt.compare(userData.password, hashedPassword, (err, res) => {
            if (err) {
                return callback(bcryptErr, null, null);
            }
            if (res) {
                const token = jwt.sign({ id: result[0].id,username: result[0].username, firstname: result[0].firstname, role: 'user' }, secret, { expiresIn: '1h' });
                return callback(null, true, token);
            } else {
                return callback(null, false, null);
            }
        });
    });
};



module.exports = {
    loginAdmin,
    loginTutor,
    loginUser
};
