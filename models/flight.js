var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');

module.exports = mongoose.model('Flight', {
    number: {
        type: String,
        required: true
    },
    planeModel: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    actualTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
