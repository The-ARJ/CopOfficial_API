const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is required'],
        unique: [true, 'Phone number already exists'],
    },
    profession: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email Already Exists'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
    image: {
        type: String
    },
    // profile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Profile'
    // }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)