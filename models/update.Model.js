const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();

const updateTutorProfile = (detailProfileTutor, callback) => {
    db.query("UPDATE tutors SET firstname = ?, lastname = ?, description = ?, experience = ?, address = ?, tel =? , bankaccount = ? , bank = ? WHERE id = ?"
    ,[ detailProfileTutor.firstname, detailProfileTutor.lastname, detailProfileTutor.description, detailProfileTutor.experience, detailProfileTutor.address, detailProfileTutor.tel,detailProfileTutor.bankaccount,detailProfileTutor.bank, detailProfileTutor.id]
    ,(err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}


const updateTeachStyle = (selectedDays, selectedTeachStyles, selectedLevel, id, callback) => {
    // Convert arrays to string or any format suitable for your database update query
    const daysString = JSON.stringify(selectedDays);
    const stylesString = JSON.stringify(selectedTeachStyles);
    const levelString = JSON.stringify(selectedLevel);

    db.query("UPDATE tutors SET teach_date = ?, teach_style = ?, level = ? WHERE id = ?", [daysString, stylesString, levelString, id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const updateUserProfile = (detailProfileUser, callback) => {
    db.query("UPDATE users SET email = ?, firstname = ?, lastname = ?, tel = ?, bankaccount = ?, bank = ? WHERE id = ?", [detailProfileUser.email, detailProfileUser.firstname, detailProfileUser.lastname, detailProfileUser.tel, detailProfileUser.bankaccount, detailProfileUser.bank, detailProfileUser.id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};



module.exports = {
    updateTutorProfile,
    updateTeachStyle,
    updateUserProfile,
}