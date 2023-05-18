const mongoose = require('mongoose')

const contactchema = mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactchema)