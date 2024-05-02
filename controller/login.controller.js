const loginModel = require('../models/loginModel')
const  apiHelper  = require('../util/apiUtil')


const loginAdmin = (req,res) => {
    const adminData = {
        username: req.body.username,
        password: req.body.password
    }

    loginModel.loginAdmin(adminData,(err,isLogin,token) => {
        if(err){
            console.log(err)
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        }else {
            if (isLogin) {
                res.status(200).json(apiHelper.successResponse({ message: 'Login successful', token }));
            } else {
                res.status(404).json(apiHelper.errorResponse("Username or Password not found"));
            }
        }
    })
}

const loginTutor = (req,res) => {
    const tutorData = {
        username: req.body.username,
        password: req.body.password
    }

    loginModel.loginTutor(tutorData,(err, isLogin, token) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (isLogin) {
                res.status(200).json(apiHelper.successResponse({ message: 'Login successful', token }));
            } else {
                res.status(404).json(apiHelper.errorResponse("Username or Password not found"));
            }
        }
    })
}

const loginUser = (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password
    };

    loginModel.loginUser(userData, (err, isLogin, token) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            if (isLogin) {
                res.status(200).json(apiHelper.successResponse({ message: 'Login successful', token }));
            } else {
                res.status(404).json(apiHelper.errorResponse("Username or Password not found"));
            }
        }
    });
};





module.exports = {
    loginAdmin,
    loginTutor,
    loginUser
}

