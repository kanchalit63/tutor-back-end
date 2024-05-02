const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();

const getProFileUser = (username, callback) => {
    db.query("SELECT id, username, email,firstname,lastname,tel, image,bankaccount,bank FROM users WHERE username = ?", [username], callback);
};


const getProFileTutor = (username, callback) => {
    db.query("SELECT * FROM tutors WHERE username = ?", [username], callback)
}

const getProfileTutorList = (callback) => {
    db.query("SELECT tutors.*, GROUP_CONCAT(DISTINCT tutor_subject.price) AS prices, GROUP_CONCAT(DISTINCT subjects.name) AS subject_names, ROUND(AVG(review.rating), 1) AS avg_rating FROM tutors INNER JOIN tutor_subject ON tutors.id = tutor_subject.tutor_id INNER JOIN subjects ON tutor_subject.subject_id = subjects.id LEFT JOIN review ON tutors.id = review.tutor_id WHERE tutors.status = 2 AND tutor_subject.deleted_at IS NULL GROUP BY tutors.id", callback);
}

const getProfileTutorListById = (id, callback) => {
    db.query("SELECT tutors.*, GROUP_CONCAT(DISTINCT tutor_subject.id) AS tutor_subject_ids, GROUP_CONCAT(DISTINCT tutor_subject.price) AS prices, GROUP_CONCAT(DISTINCT subjects.name) AS subject_names, ROUND(AVG(review.rating), 1) AS avg_rating FROM tutors INNER JOIN tutor_subject ON tutors.id = tutor_subject.tutor_id INNER JOIN subjects ON tutor_subject.subject_id = subjects.id LEFT JOIN review ON tutors.id = review.tutor_id WHERE tutors.id = ? AND tutors.status = 2 AND tutor_subject.deleted_at IS NULL AND tutor_subject.tutor_id = ? GROUP BY tutors.id", [id, id], callback);
}


const getReviewUser = (id, tutorId, callback) => {
    const sql = `
        SELECT 
            u.firstname AS user_firstname,
            u.lastname AS user_lastname,
            AVG(r.rating) AS average_rating,
            r.review AS latest_review
        FROM 
            users u
        JOIN 
            review r ON u.id = r.user_id
        WHERE
            r.tutor_id = ?
        AND
            u.id = ?
        GROUP BY 
            r.user_id`;

    db.query(sql, [tutorId, id], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}



const getUserList = (callback) => {
    db.query("SELECT id,username,firstname,lastname,tel,email,created_at FROM users WHERE deleted_at IS null", callback)
}

const getUserById = (id, callback) => {
    db.query("SELECT username,firstname,lastname,tel,email,created_at FROM users WHERE id = ?", [id], (err, result) => {
        callback(err, result)
    })
}

const updateUser = (detailUser, callback) => {
    db.query("UPDATE users SET firstname = ?, lastname = ?, tel = ?, email = ?, bankaccount = ?, bank = ?, deleted_at = null WHERE id = ?", [detailUser.firstname, detailUser.lastname, detailUser.tel, detailUser.email, detailUser.bankaccount, detailUser.bank, detailUser.id], (err, result) => {
        if (err) {
            // If an error occurs during the database query, invoke the callback with the error
            callback(err, null);
        } else {
            // If the query is successful, invoke the callback with the result
            callback(null, result);
        }
    });
};

const updateProfileImage = (userId, imageUrl, callback) => {
    db.query("UPDATE users SET image = ? WHERE id = ?", [imageUrl, userId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const updateProfileTutorImage = (tutorId, imageUrl, callback) => {
    db.query("UPDATE tutors SET image = ? WHERE id = ?", [imageUrl, tutorId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


const deleteUser = (userDelete, callback) => {
    db.query('UPDATE users SET deleted_at = ? WHERE id = ?',[userDelete.deleted_at,userDelete.id],(err,result)=>{
        callback(err,result)
    })
}


module.exports = {
    getProFileUser,
    getProFileTutor,
    getUserList,
    getUserById,
    updateUser,
    deleteUser,
    getProfileTutorList,
    getProfileTutorListById,
    getReviewUser,
    updateProfileImage,
    updateProfileTutorImage,

};
