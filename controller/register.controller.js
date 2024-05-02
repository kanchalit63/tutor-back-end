
const registerModel = require('../models/registerModel')
const apiHelper = require('../util/apiUtil')
const bcrypt = require('bcrypt');


function registerTutor(req, res) {
    const tutorData = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        tel: req.body.tel,
        image: req.body.image,
        address: req.body.address,
        description: req.body.description,
        status: 1,
    };

    // ตรวจสอบว่ามีไฟล์ที่อัปโหลดมาหรือไม่
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // สร้าง hash password
    bcrypt.hash(tutorData.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // เพิ่ม hash password เข้าไปในข้อมูลของติวเตอร์
        const newUser = {
            ...tutorData,
            password: hash,
            document: req.file.filename // เพิ่มชื่อไฟล์ที่อัปโหลดเข้าไปในข้อมูล
        };

        // เรียกใช้งานโมเดลเพื่อบันทึกข้อมูลลงในฐานข้อมูล
        registerModel.registerTutor(newUser, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json({ success: 'User registered successfully' });
        });
    });
}



const registerUser = (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        tel: req.body.tel,
        email: req.body.email,
    };


    bcrypt.hash(userData.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const newUser = {
            username: userData.username,
            password: hash,
            firstname: userData.firstname,
            lastname: userData.lastname,
            tel: userData.tel,
            email: userData.email,
        };

        registerModel.registerUser(newUser, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json({ success: 'User registered successfully' });
        });
    });
};


module.exports = {
    registerTutor,
    registerUser
};