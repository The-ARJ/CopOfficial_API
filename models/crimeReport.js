// crimeReportSchema.js
const mongoose = require('mongoose');
const progressSchema = require('./progressSchema');
const caseSchema = require('./caseSchema');

const crimeReportSchema = mongoose.Schema({
    dat: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    crimetype: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    addnote: {
        type: String,
    },
    image: {
        type: String
    },
    progress: {
        type: [progressSchema],
        default: [{}]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    case: {
        type: [caseSchema],
        default: [{ casetype: 'crimereport' }],
    }
}, { timestamps: true });

module.exports = mongoose.model('CrimeReport', crimeReportSchema);
