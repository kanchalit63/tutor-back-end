const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();



const addBooking = (bookingData, callback) => {
    const sql = `INSERT INTO booking (user_id, tutor_id, tutor_subject_id, date, time, study_place, note,status) VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
    db.query(sql, [bookingData.user_id, bookingData.tutor_id, bookingData.tutor_subject_id, bookingData.date, bookingData.time, bookingData.study_place, bookingData.note, bookingData.status], callback);
}


const getPendingBookingUser = (id, callback) => {
    const sql = `SELECT booking.*, 
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        users.tel AS user_tel,
                        tutors.firstname AS tutor_name,
                        tutor_subject.price AS subject_price,
                        subjects.name AS subject_name
                 FROM booking
                 INNER JOIN users ON booking.user_id = users.id
                 INNER JOIN tutors ON booking.tutor_id = tutors.id
                 INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
                 INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
                 WHERE booking.user_id = ? AND booking.status = 1`;
    db.query(sql, id, callback);
}

const updateUserBookingReject = (bookingId, callback) => {
    const sql = `UPDATE booking SET status = 5 WHERE id = ?`;
    db.query(sql, bookingId, callback);
}

const getApproveBookingUser = (id, callback) => {
    const sql = `SELECT booking.*, 
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        users.tel AS user_tel,
                        tutors.firstname AS tutor_name,
                        tutor_subject.price AS subject_price,
                        subjects.name AS subject_name
                 FROM booking
                 INNER JOIN users ON booking.user_id = users.id
                 INNER JOIN tutors ON booking.tutor_id = tutors.id
                 INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
                 INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
                 WHERE booking.user_id = ? AND booking.status = 2`;
    db.query(sql, id, callback);
}

const getRejectBookingUser = (id, callback) => {
    const sql = `SELECT booking.*, 
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        users.tel AS user_tel,
                        tutors.firstname AS tutor_name,
                        tutor_subject.price AS subject_price,
                        subjects.name AS subject_name
                 FROM booking
                 INNER JOIN users ON booking.user_id = users.id
                 INNER JOIN tutors ON booking.tutor_id = tutors.id
                 INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
                 INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
                 WHERE booking.user_id = ? AND booking.status = 3`;
    db.query(sql, id, callback);
}

const getSuccessBookingUser = (id, callback) => {
    const sql = `SELECT booking.*, 
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        users.tel AS user_tel,
                        tutors.firstname AS tutor_name,
                        tutor_subject.price AS subject_price,
                        subjects.name AS subject_name
                 FROM booking
                 INNER JOIN users ON booking.user_id = users.id
                 INNER JOIN tutors ON booking.tutor_id = tutors.id
                 INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
                 INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
                 WHERE booking.user_id = ? AND booking.status = 4`;
    db.query(sql, id, callback);
}


////////// Tutor //////////

const getPendingBookingTuTor = (id, callback) => {
    const sql = `SELECT booking.*, 
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        users.tel AS user_tel,
                        tutors.firstname AS tutor_name,
                        tutor_subject.price AS subject_price,
                        subjects.name AS subject_name
                 FROM booking
                 INNER JOIN users ON booking.user_id = users.id
                 INNER JOIN tutors ON booking.tutor_id = tutors.id
                 INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
                 INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
                 WHERE booking.tutor_id = ? AND booking.status = 7`;
    db.query(sql, id, callback);
}

const getApproveBookingTuTor = (id, callback) => {
    const sql = `SELECT booking.*, 
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        users.tel AS user_tel,
                        tutors.firstname AS tutor_name,
                        tutor_subject.price AS subject_price,
                        subjects.name AS subject_name
                 FROM booking
                 INNER JOIN users ON booking.user_id = users.id
                 INNER JOIN tutors ON booking.tutor_id = tutors.id
                 INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
                 INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
                 WHERE booking.tutor_id = ? AND booking.status = 2`;
    db.query(sql, id, callback);
}

const getRejectBookingTuTor = (id, callback) => {
    const sql = `SELECT booking.*, 
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        users.tel AS user_tel,
                        tutors.firstname AS tutor_name,
                        tutor_subject.price AS subject_price,
                        subjects.name AS subject_name
                 FROM booking
                 INNER JOIN users ON booking.user_id = users.id
                 INNER JOIN tutors ON booking.tutor_id = tutors.id
                 INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
                 INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
                 WHERE booking.tutor_id = ? AND booking.status = 3`;
    db.query(sql, id, callback);
}

const getSuccessBookingTuTor = (id, callback) => {
    const sql = `SELECT booking.*, 
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        users.tel AS user_tel,
                        tutors.firstname AS tutor_name,
                        tutor_subject.price AS subject_price,
                        subjects.name AS subject_name
                 FROM booking
                 INNER JOIN users ON booking.user_id = users.id
                 INNER JOIN tutors ON booking.tutor_id = tutors.id
                 INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
                 INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
                 WHERE booking.tutor_id = ? AND booking.status = 4`;
    db.query(sql, id, callback);
}


const updateBookingApprove = (bookingId, callback) => {
    const sql = `UPDATE booking SET status = 2 WHERE id = ?`;
    db.query(sql, bookingId, callback);
}

const updateBookingReject = (bookingId, callback) => {
    const sql = `UPDATE booking SET status = 3 WHERE id = ?`;
    db.query(sql, bookingId, callback);
}

const updateBookingSuccess = (bookingId, callback) => {
    const sql = `UPDATE booking SET status = 4 WHERE id = ?`;
    db.query(sql, bookingId, callback);
}


const paymentBooking = (paymentData, callback) => {
    const sql = `INSERT INTO payment (tutor_id, user_id, booking_id, tutor_subject_id, image, created_at) 
                 SELECT b.tutor_id, b.user_id, b.id, b.tutor_subject_id, ?, UNIX_TIMESTAMP() AS created_at
                 FROM booking AS b
                 WHERE b.id = ? AND b.status = 1`;

    db.query(sql, [paymentData.image, paymentData.booking_id], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            const updateSql = `UPDATE booking SET status = 6 WHERE id = ? AND status = 1`;
            db.query(updateSql, [paymentData.booking_id], callback);
        }
    });
}

const getPaymentBooking = (id, callback) => {
    const sql = `
    SELECT DISTINCT booking.*, 
           users.firstname AS user_firstname,
           users.lastname AS user_lastname,
           users.tel AS user_tel,
           tutors.firstname AS tutor_name,
           tutor_subject.price AS subject_price,
           subjects.name AS subject_name,
           payment.image AS image
    FROM booking
    INNER JOIN users ON booking.user_id = users.id
    INNER JOIN tutors ON booking.tutor_id = tutors.id
    INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
    INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
    LEFT JOIN payment ON booking.id = payment.booking_id
    WHERE booking.user_id = ? AND booking.status IN (1, 6, 7,9)
    `;
    db.query(sql, [id], callback);
}


const getPaymentBookingAll = (callback) => {
    const sql = `
    SELECT DISTINCT booking.*, 
           users.firstname AS user_firstname,
           users.lastname AS user_lastname,
           users.tel AS user_tel,
           users.bankaccount AS user_bankaccount,
           users.bank AS user_bank,
           tutors.firstname AS tutor_name,
           tutor_subject.price AS subject_price,
           subjects.name AS subject_name,
           payment.image AS image
    FROM booking
    INNER JOIN users ON booking.user_id = users.id
    INNER JOIN tutors ON booking.tutor_id = tutors.id
    INNER JOIN tutor_subject ON booking.tutor_subject_id = tutor_subject.id
    INNER JOIN subjects ON tutor_subject.subject_id = subjects.id
    LEFT JOIN payment ON booking.id = payment.booking_id
    WHERE booking.status in (6, 7)
    `;
    db.query(sql, callback);
}


const updatePaymentBooking = (id, callback) => {
    const sql = `UPDATE booking SET status = 7 WHERE id = ?`;
    db.query(sql, [id], callback);
}

const updatePaymentRejectBooking = (id, callback) => {
    const sql = `UPDATE booking SET status = 9 WHERE id = ?`;
    db.query(sql, [id], callback);
}



module.exports = {
    addBooking,
    getPendingBookingUser,
    getApproveBookingUser,
    getRejectBookingUser,
    getSuccessBookingUser,
    getPendingBookingTuTor,
    getApproveBookingTuTor,
    getRejectBookingTuTor,
    getSuccessBookingTuTor,
    updateBookingApprove,
    updateBookingReject,
    updateBookingSuccess,
    updateUserBookingReject,
    paymentBooking,
    getPaymentBooking,
    getPaymentBookingAll,
    updatePaymentBooking,
    updatePaymentRejectBooking,
};