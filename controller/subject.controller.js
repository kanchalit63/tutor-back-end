const subjectModel = require('../models/subjectModel');
const apiHelper = require('../util/apiUtil')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.JWT_SECRETKEY


const getSubjects = (req, res) => {
    subjectModel.getSubjects((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse(result));
        }
    });
};

const getSubjectSingle = (req, res) => {
    const id = req.params.id;
    subjectModel.getSubjectSingle(id, (err, result) => {
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
    });
}


function addSubject(req, res) {
    const subjectData = {
        name: req.body.name,
    }

    if (!subjectData.name) {
        res.status(400).json(apiHelper.errorResponse("Subject name is required"));
        return;
    }

    subjectModel.addSubject(subjectData, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Subject added successfully"));
        }
    });
}

const editSubject = (req, res) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const subjectEdit = {
        id: req.body.id,
        name: req.body.name,
        updated_at: formattedDateTime
    }
    subjectModel.editSubject(subjectEdit, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Successfully updated subject name');
            res.send(result); // If needed, you can send the result as a response
        }
    })
}

const deleteSubject = (req, res) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const subjectDelete = {
        id: req.body.id,
        deleted_at: formattedDateTime
    }

    subjectModel.deleteSubject(subjectDelete, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Subject has Deleted');
            res.send(result); // If needed, you can send the result as a response
        }
    })
}

const addSubjectTutor = (req, res) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const subjectData = {
        tutor_id: req.body.tutor_id,
        subject_id: req.body.subject_id,
        price: req.body.price,
        created_at: formattedDateTime
    };
    subjectModel.addSubjectTutor(subjectData, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(200).json({ message: "Subject added successfully" });
        }
    });
};


const getSubjectTutor = (req, res) => {
    const id = req.params.id;
    subjectModel.getSubjectTutor(id, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse(result));
        }
    });
}

const getSubjectTutorSingle = (req, res) => {
    const id = req.params.id;
    subjectModel.getSubjectTutorSingle(id, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse(result));
        }
    });
}

const editTutorSubject = (req,res) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const subjectEdit = {
        id: req.body.id,
        price: req.body.price,
        updated_at: formattedDateTime
    }
    subjectModel.editTutorSubject(subjectEdit, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Successfully updated subject name');
            res.send(result); // If needed, you can send the result as a response
        }
    })
}

const deleteTutorSubject = (req, res) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const subjectDelete = {
        id: req.body.id,
        deleted_at: formattedDateTime
    }

    subjectModel.deleteTutorSubject(subjectDelete, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Subject has Deleted');
            res.send(result); // If needed, you can send the result as a response
        }
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
