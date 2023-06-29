const mongoose = require('mongoose');
const progressSchema = require('./progressSchema');
const caseSchema = require('./caseSchema');

const firSchema = mongoose.Schema({
    dat: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    crimetype: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    additionalNote: {
        type: String
    },
    image: {
        type: String,
        required: true

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
        default: [{ casetype: 'fir' }]
    }
}, { timestamps: true });

module.exports = mongoose.model('FIR', firSchema);
