// models/subjectModel.js
const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();

function getContact(callback) {
    db.query("SELECT * FROM contacts WHERE approved_at is null", callback);
}

const addContact = (contactData, callback) => {
    db.query(
        "INSERT INTO contacts (name,tel,detail) VALUES (?,?,?)",
        [...Object.values(contactData)],
        (err, result) => {
            callback(err, result);
        }
    );
};


const approveContact = (contactDataUpdate, callback) => {
    db.query('UPDATE contacts SET approved_at = ? WHERE id = ?', [contactDataUpdate.approved_at, contactDataUpdate.id], (err, result) => {
        callback(err, result);
    });
};


module.exports = {
    getContact,
    addContact,
    approveContact
};
