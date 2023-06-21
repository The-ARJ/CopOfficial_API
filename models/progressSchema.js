// progressSchema.js
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

module.exports = progressSchema;
