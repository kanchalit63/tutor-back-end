

const verifyToken = (req,res,next) => {

    const bearerHeader = req.headers['authorization']


    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
    
}

const multer = require('multer');
// กำหนด disk storage สำหรับ multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images'); // บันทึกไฟล์ไว้ในโฟลเดอร์ images
    },
    filename: function (req, file, cb) {
        // สร้างชื่อไฟล์ใหม่โดยใช้ timestamp และชื่อเดิมของไฟล์
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage });

module.exports = {
    verifyToken,
    upload,
};