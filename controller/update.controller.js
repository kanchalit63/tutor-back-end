const updateModel = require('../models/update.Model');
const apiHelper = require('../util/apiUtil');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.JWT_SECRETKEY

const updateTutorProfile = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const detailProfileTutor = {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        description: req.body.description,
        experience: req.body.experience,
        address: req.body.address,
        tel: req.body.tel,
        bankaccount: req.body.bankaccount,
        bank: req.body.bank
    }

    if(decoded.id === req.body.id){
        updateModel.updateTutorProfile(detailProfileTutor, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        })
    } else {
        res.status(403).json(apiHelper.errorResponse("Unauthorized")); // หากไม่ตรงกัน ส่งคำตอบสถานะ 403 (Unauthorized)
    }
}

const updateTeachStyle = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const id = decoded.id; // เรียกใช้ id จาก decoded
    const selectedDays = req.body.selectedDays;
    const selectedTeachStyles = req.body.selectedTeachStyles;
    const selectedLevel = req.body.selectedLevel;

    updateModel.updateTeachStyle(selectedDays, selectedTeachStyles, selectedLevel, id, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse(result));
        }
    });
};

const updateUserProfile = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const detailProfileUser = {
        id: req.body.id,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        tel: req.body.tel,
        bankaccount: req.body.bankaccount,
        bank: req.body.bank
    } 

    if(decoded.id === req.body.id){
        updateModel.updateUserProfile(detailProfileUser, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        })
    }
}

module.exports = {
    updateTutorProfile,
    updateTeachStyle,
    updateUserProfile,
}