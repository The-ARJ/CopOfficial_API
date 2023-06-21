const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    sequenceValue: {
        type: Number,
        default: 0
    }
});

const Counter = mongoose.model('Counter', counterSchema);

const caseSchema = mongoose.Schema({
    caseId: {
        type: Number,
        unique: true
    },
    casetype: {
        type: String,
        required: true
    }
});

caseSchema.pre('save', function (next) {
    const doc = this;
    Counter.findByIdAndUpdate(
        { _id: 'caseId' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
    )
    .exec(function (err, counter) {
        if (err) return next(err);
        doc.caseId = counter.sequenceValue;
        next();
    });
});

module.exports = caseSchema;
