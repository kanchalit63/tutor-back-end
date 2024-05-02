const { connectToDatabase } = require('../config/database');
const db = connectToDatabase();



const getReviewTutor = (bookingId, callback) => {
    const sql = `
    SELECT 
        booking.id AS booking_id,
        tutors.id as tutor_id,
        tutors.firstname AS tutor_firstname,
        tutors.lastname AS tutor_lastname,
        tutors.image AS tutor_image,
        users.id AS user_id,
        users.firstname AS user_firstname,
        users.lastname AS user_lastname
    FROM 
        booking
    JOIN 
        tutors ON booking.tutor_id = tutors.id
    JOIN 
        users ON booking.user_id = users.id
    WHERE 
        booking.id = ?`;
    db.query(sql, bookingId, callback);
};


const addReviewTutor = (review, callback) => {
    const sql = `
        INSERT INTO review (tutor_id, user_id, booking_id, rating, review) 
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        rating = VALUES(rating),
        review = VALUES(review)
    `;
    const values = [review.tutor_id, review.user_id, review.booking_id, review.rating, review.review];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            // เมื่อ INSERT หรือ UPDATE สำเร็จ ทำการอัพเดตค่าในตาราง booking
            const sqlUpdateBooking = `
                UPDATE booking 
                SET status = 5 
                WHERE id = ?
            `;
            const valuesUpdateBooking = [review.booking_id];
            db.query(sqlUpdateBooking, valuesUpdateBooking, (err, result) => {
                if (err) {
                    console.error(err);
                    callback(err);
                } else {
                    // การอัพเดตในตาราง booking สำเร็จ
                    callback(null, result);
                }
            });
        }
    });
};






module.exports = {
    getReviewTutor,
    addReviewTutor
}
