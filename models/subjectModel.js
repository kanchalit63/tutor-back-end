const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();

function getSubjects(callback) {
    db.query("SELECT * FROM subjects WHERE deleted_at is null ", callback);
}

const getSubjectSingle = (id, callback) => {
    db.query('SELECT * FROM subjects WHERE id = ?', [id], (err, result) => {
        callback(err, result);
    });
}

function addSubject(subjectData, callback) {
    // Your database query to insert a new subject
    db.query(
        "INSERT INTO subjects (name) VALUES (?)",
        [...Object.values(subjectData)],
        (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
}

const editSubject = (subjectEdit, callback) => {
    db.query('UPDATE subjects SET name = ?, updated_at = ? WHERE id = ?', [subjectEdit.name, subjectEdit.updated_at, subjectEdit.id], (err, result) => {
        callback(err, result);
    });
}

const deleteSubject = (subjectDelete, callback) => {
    db.query('UPDATE subjects SET deleted_at = ? WHERE id = ?', [subjectDelete.deleted_at, subjectDelete.id], (err, result) => {
        callback(err, result);
    })
}

const addSubjectTutor = (subjectData, callback) => {
    db.query("INSERT INTO tutor_subject (tutor_id, subject_id, price, created_at) VALUES (?, ?, ?, ?)",
        [subjectData.tutor_id, subjectData.subject_id, subjectData.price, subjectData.created_at],
        (err, result) => {
            callback(err, result);
        });
};


const getSubjectTutor = (id, callback) => {
    const query = `
    SELECT tutor_subject.id AS tutor_subject_id, subjects.name AS subject_name, tutor_subject.price, tutor_subject.updated_at
    FROM tutor_subject
    JOIN subjects ON tutor_subject.subject_id = subjects.id
    WHERE tutor_subject.tutor_id = ? AND tutor_subject.deleted_at IS NULL;
    
    `;
    db.query(query, [id], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
};

const getSubjectTutorSingle = (id, callback) => {
    const query = `
        SELECT tutor_subject.id AS tutor_subject_id, subjects.name AS subject_name, tutor_subject.price, tutor_subject.updated_at
        FROM tutor_subject
        JOIN subjects ON tutor_subject.subject_id = subjects.id
        WHERE tutor_subject.id = ? ;
    `;
    db.query(query, [id], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}




const editTutorSubject = (subjectEdit, callback) => {
    db.query('UPDATE tutor_subject SET price = ?, updated_at = ? WHERE id = ?', [subjectEdit.price, subjectEdit.updated_at, subjectEdit.id], (err, result) => {
        callback(err, result);
    });
}


const deleteTutorSubject = (subjectDelete, callback) => {
    db.query('UPDATE tutor_subject SET deleted_at = ? WHERE id = ?', [subjectDelete.deleted_at, subjectDelete.id], (err, result) => {
        callback(err, result);
    })
}

module.exports = {
    getSubjects,
    addSubject,
    editSubject,
    deleteSubject,
    getSubjectSingle,
    addSubjectTutor,
    getSubjectTutor,
    editTutorSubject,
    getSubjectTutorSingle,
    deleteTutorSubject,
};
