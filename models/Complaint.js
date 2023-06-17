const mongoose = require('mongoose');

const progressSchema = mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    comment: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    officer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

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
        default: [{}] // Set an empty object as the default value for progress array
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
