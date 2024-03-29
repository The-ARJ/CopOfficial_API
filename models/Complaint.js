// complaintSchema.js
const mongoose = require('mongoose');
const progressSchema = require('./progressSchema');
const caseSchema = require('./caseSchema');

const complaintSchema = mongoose.Schema({
    dat: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    offendername: {
        type: String,
    },
    offenderdet: {
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
        default: [{ casetype: 'complaint' }],
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
