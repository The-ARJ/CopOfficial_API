const mongoose = require('mongoose');

const criminalSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    aliases: {
        type: String
    },
    description: {
        type: String
    },
    crime: {
        type: String
    },
    image: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    arrestDate: {
        type: String
    },
    releaseDate: {
        type: String
    },
    status: {
        type: String,
        enum: ['released', 'incarcerated', 'arrested'],
        default: 'arrest'
    }
}, { timestamps: true });

module.exports = mongoose.model('Criminal', criminalSchema);
