const express = require('express');
const cors = require('cors');
const subjectController = require('./controller/subject.controller');
const contactController = require('./controller/contact.controller')
const tutorContrller = require('./controller/tutor.controller');
const loginController = require('./controller/login.controller')
const registerController = require('./controller/register.controller')
const profileController = require('./controller/profile.controller')
const updateController = require('./controller/update.controller')
const bookingController = require('./controller/booking.controller')
const reviewController = require('./controller/review.controller')


const {verifyToken} = require('./middleware/middleware')
const {upload} = require('./middleware/middleware')
const app = express();

app.listen(8080, () => console.log('Server is Running on Port 8080'));

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT","PATCH"],
    credentials: true
}));


app.use('/images', express.static('images'));
app.use('/image', express.static('image'));
app.use('/documents', express.static('images'));

app.get('/tutorlist', tutorContrller.getTutorlist);
app.get('/tutlorlist/:id', tutorContrller.getTutorlistSingle)
app.get('/getUserList', profileController.getUserList );
app.get('/getUserList/:id', profileController.getUserById );
app.get('/userprofile',verifyToken, profileController.getProFileUser );




app.get('/tutorprofile',verifyToken, profileController.getProFileTutor );


app.get('/listtutor', profileController.getProfileTutorList );
app.get('/listtutor/:id', profileController.getProfileTutorListById)
app.get('/reviewuser/:userId/:tutorId', profileController.getReviewUser)


app.post('/addbooking',bookingController.addBooking)
app.post('/addpayment',upload.single('image'),bookingController.paymentBooking)
app.get('/allpaymentbooking', bookingController.getPaymentBookingAll);
app.patch('/updatepaymentbooking', bookingController.updatePaymentBooking);
app.patch('/updatepaymentbookingreject', bookingController.updatePaymentRejectBooking);

app.get('/getpaymentbooking/:id', bookingController.getPaymentBooking);


app.get('/listbookingpending/:id', bookingController.getPendingBookingUser);
app.get('/listbookingapprove/:id', bookingController.getApproveBookingUser);
app.get('/listbookingreject/:id', bookingController.getRejectBookingUser);
app.get('/listbookingsuccess/:id', bookingController.getSuccessBookingUser);



app.get('/listbookingpendingTuTor/:id', bookingController.getPendingBookingTuTor);
app.get('/listbookingapproveTuTor/:id', bookingController.getApproveBookingTuTor);
app.get('/listbookingrejectTuTor/:id', bookingController.getRejectBookingTuTor);


app.patch('/updatebookingapprove', bookingController.updateBookingApprove);
app.patch('/updatebookingreject', bookingController.updateBookingReject);
app.patch('/updatebookingsuccess', bookingController.updateBookingSuccess);
app.patch('/updateUserBookingReject', bookingController.updateUserBookingReject);




app.get('/getReviewTutor/:id', reviewController.getReviewTutor);
app.post('/addReviewTutor', reviewController.addReviewTutor);





app.patch('/updateTutorProfile',verifyToken, updateController.updateTutorProfile);
app.patch('/updateTeachStyle',verifyToken, updateController.updateTeachStyle);
app.patch('/updateUserProfile',verifyToken, updateController.updateUserProfile);


app.patch('/updateUserImage', verifyToken, upload.single('image'), profileController.uploadProfileImage);
app.patch('/updateTutorImage', verifyToken, upload.single('image'), profileController.uploadProfileTutorImage);



app.post('/register', registerController.registerUser);

app.post('/tutor-login',loginController.loginTutor)
app.post('/user-login',loginController.loginUser)

app.post('/addtutorsubject',verifyToken,subjectController.addSubjectTutor)



app.get('/tutor-subject/:id', subjectController.getSubjectTutor);
app.get('/tutor-subject-single/:id', subjectController.getSubjectTutorSingle);
app.patch('/update-tutor-subject', subjectController.editTutorSubject);
app.patch('/delete-tutor-subject', subjectController.deleteTutorSubject);

// ADMIN //
app.post('/admin-login',loginController.loginAdmin)
app.post('/add-contact', contactController.addContact);
app.get('/subject', subjectController.getSubjects);
app.get(`/subject/:id`,subjectController.getSubjectSingle)
app.get('/contact', contactController.getContact);
app.post('/add-subject', subjectController.addSubject);
app.patch('/updatecontact', contactController.approveContact);
app.patch('/editnamesubject', subjectController.editSubject);
app.patch('/updatetutorstatus', tutorContrller.updateStatus)
app.patch('/deletesubject', subjectController.deleteSubject);
app.patch('/delete-user', profileController.deleteUser)
// END ADMIN //


// USER // 


// END USER //


// TUTOR //
app.post('/add-tutor',upload.single('document'), registerController.registerTutor);
// END TUTOR //




