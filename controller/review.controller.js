const  apiHelper  = require('../util/apiUtil')
const  reviewModel = require('../models/reviewModel')


const getReviewTutor = (req, res) => {
    const tutorId = req.params.id;
    reviewModel.getReviewTutor(tutorId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Review not found"));
            } else {

                const imageUrl = result[0].tutor_image;
                const profileImageUrl = `${req.protocol}://${req.get('host')}/images/${imageUrl}`;
                // แก้ไขการส่งค่าในการตอบกลับ
                const responseData = {
                    ...result[0], // คัดลอกข้อมูลทั้งหมดจาก result[0]
                    image: profileImageUrl // เพิ่ม profileImageUrl ใน response data
                };

                res.status(200).json(apiHelper.successResponse(responseData));
            }
        }
    });
}

const addReviewTutor = (req, res) => {
    const review = {
        tutor_id: req.body.tutor_id,
        user_id: req.body.user_id,
        booking_id: req.body.booking_id,
        rating: req.body.rating,
        review: req.body.review
    };
    reviewModel.addReviewTutor(review, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(201).json(apiHelper.successResponse(result));
        }
    });
};


module.exports = {
    getReviewTutor,
    addReviewTutor,
}