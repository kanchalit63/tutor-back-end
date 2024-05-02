const profileModel = require('../models/profileModel');
const apiHelper = require('../util/apiUtil');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.JWT_SECRETKEY

const getProFileUser = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, secret);

    if (decoded.role === 'user') {
        profileModel.getProFileUser(decoded.username, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
            } else {
                // แปลงชื่อไฟล์เป็น URL
                const imageUrl = result[0].image;
                const profileImageUrl = `${req.protocol}://${req.get('host')}/images/${imageUrl}`;

                // สร้าง response โดยรวม URL ภาพโปรไฟล์กับข้อมูลผู้ใช้
                const responseData = {
                    id: result[0].id,
                    username: result[0].username,
                    email: result[0].email,
                    firstname: result[0].firstname,
                    lastname: result[0].lastname,
                    tel: result[0].tel,
                    bankaccount: result[0].bankaccount,
                    bank: result[0].bank,
                    profile_image: profileImageUrl
                };

                res.status(200).json(apiHelper.successResponse(responseData));
            }
        });
    } else {
        res.status(403).json(apiHelper.errorResponse("Unauthorized access"));
    }
};




const getProFileTutor = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, secret);

    if (decoded.role === 'tutor') {
        profileModel.getProFileTutor(decoded.username, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
            } else {
                // เพิ่มการเข้าถึง imageUrl และ profileImageUrl
                const imageUrl = result[0].image;
                const profileImageUrl = `${req.protocol}://${req.get('host')}/images/${imageUrl}`;

                // แก้ไขการส่งค่าในการตอบกลับ
                const responseData = {
                    ...result[0], // คัดลอกข้อมูลทั้งหมดจาก result[0]
                    image: profileImageUrl // เพิ่ม profileImageUrl ใน response data
                };

                res.status(200).json(apiHelper.successResponse(responseData));
            }
        });
    } else {
        res.status(403).json(apiHelper.errorResponse("Unauthorized access"));
    }
}



const getProfileTutorList = (req, res) => {
    profileModel.getProfileTutorList((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            const modifiedResult = result.map(item => {
                const imageUrl = item.image;
                const profileImageUrl = `${req.protocol}://${req.get('host')}/images/${imageUrl}`;
                return {
                    ...item,
                    image: profileImageUrl
                };
            });
            res.status(200).json(apiHelper.successResponse(modifiedResult));
        }
    })
}



const getProfileTutorListById = (req, res) => {
    const id = req.params.id
    profileModel.getProfileTutorListById(id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Tutor not found"));
            } else {
                const imageUrl = result[0].image;
                const profileImageUrl = `${req.protocol}://${req.get('host')}/images/${imageUrl}`;

                // แก้ไขการส่งค่าในการตอบกลับ
                const responseData = {
                    ...result[0], // คัดลอกข้อมูลทั้งหมดจาก result[0]
                    image: profileImageUrl // เพิ่ม profileImageUrl ใน response data
                };
                res.status(200).json(apiHelper.successResponse(responseData));
            }
        }
    })
}

const getReviewUser = (req, res) => {
    const userId = req.params.userId;
    const tutorId = req.params.tutorId;

    profileModel.getReviewUser(userId, tutorId, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Review not found"));
            } else {
                
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}






const getUserList = (req, res) => {
    profileModel.getUserList((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse(result));
        }
    });
}

const getUserById = (req, res) => {
    const id = req.params.id
    profileModel.getUserById(id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Subject not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result[0]));
            }
        }
    })
}

const updateUser = (req, res) => {
    const detailUser = {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        tel: req.body.tel,
        email: req.body.email
    }
    profileModel.updateUser(detailUser, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Successfully updated user');
            res.send(result);
        }
    })
}


const uploadProfileImage = (req, res) => {
    // รับข้อมูลรูปภาพจาก req.file
    const file = req.file;
    const userId = req.body.userId; // ตั้งค่า userId ตามที่คุณใช้งาน

    // เรียกใช้งานฟังก์ชันในโมเดลเพื่ออัปเดตที่อยู่ของรูปภาพโปรไฟล์ในฐานข้อมูล
    profileModel.updateProfileImage(userId, file.filename, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Successfully updated profile image');
            res.send(result);
        }
    });
};


const uploadProfileTutorImage = (req, res) => {
    const file = req.file;
    const tutorId = req.body.tutorId;
    profileModel.updateProfileTutorImage(tutorId, file.filename, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Successfully updated profile image');
            res.send(result);
        }
    });
}


const deleteUser = (req, res) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const userDelete = {
        id: req.body.id,
        deleted_at: formattedDateTime
    }

    profileModel.deleteUser(userDelete, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('User has Deleted');
            res.send(result);
        }
    })
}

module.exports = {
    getProFileUser,
    getProFileTutor,
    getProfileTutorList,
    getProfileTutorListById,
    getUserList,
    getUserById,
    updateUser,
    deleteUser,
    getReviewUser,
    uploadProfileImage,
    uploadProfileTutorImage,
};
