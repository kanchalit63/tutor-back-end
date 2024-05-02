const tutorModel = require('../models/tutorModel')
const apiHelper = require('../util/apiUtil')

function getTutorlist(req, res) {
    tutorModel.getTutorlist((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"))
        } else {
            // แก้ไขการสร้าง response data
            const responseData = result.map(tutor => {
                // หากต้องการดึง documentUrl ให้ใช้ req.protocol และ req.get('host') เช่นกัน
                const documentUrl = `${req.protocol}://${req.get('host')}/documents/${tutor.document}`;
                // สร้าง object ใหม่ที่มีการเพิ่ม documentUrl
                return { ...tutor, documentUrl };
            });

            res.status(200).json(apiHelper.successResponse(responseData));
        }
    });
}


const getTutorlistSingle = (req, res) => {
    const id = req.params.id;
    tutorModel.getTutorlistSingle(id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Tutor not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result[0]));
            }
        }
    });
};




const updateStatus = (req,res) => {
    const tutorDataStatus = { 
        id: req.body.id,
        status: req.body.status
    }

    tutorModel.updateStatus(tutorDataStatus, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Successfully Approved Tutor Completed');
            res.send(result); // If needed, you can send the result as a response
        }
    })
}


module.exports = {
    getTutorlist,
    updateStatus,
    getTutorlistSingle
};