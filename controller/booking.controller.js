const  apiHelper  = require('../util/apiUtil')
const  bookingModel  = require('../models/bookingModel')


const addBooking = (req, res) => {
    const bookingData = {
        user_id: req.body.user_id,
        tutor_id: req.body.tutor_id,
        tutor_subject_id: req.body.tutor_subject_id,
        date: req.body.date,
        time: req.body.time,
        study_place: req.body.study_place,
        note: req.body.note,
        status: 1,
    };
    bookingModel.addBooking(bookingData, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Booking added successfully"));
        }
    });
}


const getPendingBookingUser = (req, res) => {
    const bookingId = req.params.id;
    bookingModel.getPendingBookingUser(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}

const updateUserBookingReject = (req, res) => {
    const bookingId = req.body.id;
    bookingModel.updateUserBookingReject(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Booking updated successfully"));
        }
    }
    );  
}


const getApproveBookingUser = (req, res) => {
    const bookingId = req.params.id; // เปลี่ยนเป็น req.params.id แทน req.params.bookingId
    bookingModel.getApproveBookingUser(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}

const getRejectBookingUser = (req, res) => {
    const bookingId = req.params.id;
    bookingModel.getRejectBookingUser(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}

const getSuccessBookingUser = (req, res) => {
    const bookingId = req.params.id;
    bookingModel.getSuccessBookingUser(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}

const getPendingBookingTuTor = (req, res) => {
    const bookingId = req.params.id;
    bookingModel.getPendingBookingTuTor(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}


const getApproveBookingTuTor = (req, res) => {
    const bookingId = req.params.id; // เปลี่ยนเป็น req.params.id แทน req.params.bookingId
    bookingModel.getApproveBookingTuTor(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}

const getRejectBookingTuTor = (req, res) => {
    const bookingId = req.params.id;
    bookingModel.getRejectBookingTuTor(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}

const getSuccessBookingTuTor = (req, res) => {
    const bookingId = req.params.id;
    bookingModel.getSuccessBookingTuTor(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {
                res.status(200).json(apiHelper.successResponse(result));
            }
        }
    });
}



const updateBookingApprove = (req, res) => {
    const bookingId = req.body.id;
    bookingModel.updateBookingApprove(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Booking updated successfully"));
        }
    });
}

const updateBookingReject = (req, res) => {
    const bookingId = req.body.id;
    bookingModel.updateBookingReject(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Booking updated successfully"));
        }
    });
}

const  updateBookingSuccess = (req, res) => {
    const bookingId = req.body.id;
    bookingModel.updateBookingSuccess(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Booking updated successfully"));
        }
    });
}

const paymentBooking = (req, res) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const paymentData = {
        user_id: req.body.user_id,
        tutor_id: req.body.tutor_id,
        tutor_subject_id: req.body.tutor_subject_id,
        booking_id: req.body.booking_id,
        image: req.file ? req.file.filename : null, 
        created_at: formattedDateTime
    };

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    bookingModel.paymentBooking(paymentData, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Payment added successfully"));
        }
    });
}

const getPaymentBooking = (req, res) => {
    const bookingId = req.params.id;
    bookingModel.getPaymentBooking(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (result.length === 0) {
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            } else {

                const responseData = result.map(booking => {
                    const imageUrl = `${req.protocol}://${req.get('host')}/images/${booking.image}`;
                    return { ...booking, imageUrl };
                }
                );

                res.status(200).json(apiHelper.successResponse(responseData));
            }
        }
    });
}


const getPaymentBookingAll = (req,res) => {
    bookingModel.getPaymentBookingAll((err,result) => {
        if(err){
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        }else{
            if(result.length === 0){
                res.status(404).json(apiHelper.errorResponse("Booking not found"));
            }else{
                const responseData = result.map(booking => {
                    const imageUrl = `${req.protocol}://${req.get('host')}/images/${booking.image}`;
                    return { ...booking, imageUrl };
                }
                );
                res.status(200).json(apiHelper.successResponse(responseData));
            }
        }
    });
}

const  updatePaymentBooking = (req, res) => {
    const bookingId = req.body.id;
    bookingModel.updatePaymentBooking(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Booking updated successfully"));
        }
    });
}

const  updatePaymentRejectBooking = (req, res) => {
    const bookingId = req.body.id;
    bookingModel.updatePaymentRejectBooking(bookingId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Booking updated successfully"));
        }
    });
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
