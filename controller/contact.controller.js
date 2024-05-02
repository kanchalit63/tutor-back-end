const contactModel = require('../models/contactModel'); 
const  apiHelper  = require('../util/apiUtil')

function getContact(req, res) {
    contactModel.getContact((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"))
        } else {
            res.status(200).json(apiHelper.successResponse(result))
        }
    });
}

function addContact(req, res) {
    const contactData = {
        name: req.body.name,
        tel: req.body.tel,
        detail: req.body.detail,
    };

    if (!contactData.name) {
        res.status(400).json(apiHelper.errorResponse("Contact name is required"));
        return;
    }

    contactModel.addContact(contactData, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json(apiHelper.errorResponse("Internal Server Error"));
        } else {
            res.status(200).json(apiHelper.successResponse("Contact added successfully"));
        }
    });
}

const approveContact = (req, res) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();

    const contactDataUpdate = {
        id: req.body.id,
        approved_at: formattedDateTime, // Use 'approved_at' instead of 'status'
    };

    contactModel.approveContact(contactDataUpdate, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Successfully updated contact');
            res.send(result); // If needed, you can send the result as a response
        }
    });
};


module.exports = {
    getContact,
    addContact,
    approveContact
};
