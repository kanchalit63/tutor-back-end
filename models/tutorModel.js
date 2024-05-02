const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();

function getTutorlist(callback) {
    db.query("SELECT * FROM tutors", callback);
}

const getTutorlistSingle = (id, callback) => {
    db.query('SELECT firstname, lastname, address, description, image, experience, teach_date, teach_style FROM tutors WHERE id = ?', [id], (err, result) => {
        callback(err, result);
    })
}

const updateStatus = (tutorDataStatus, callback) => {
    db.query('UPDATE tutors SET status = ? WHERE id = ?',[tutorDataStatus.status,tutorDataStatus.id],(err,result) =>{
        callback(err, result);
    })
}




module.exports = {
    getTutorlist,
    updateStatus,
    getTutorlistSingle
};
