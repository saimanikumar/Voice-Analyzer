const mongoose = require('mongoose');

const speechSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    speechText: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    // Other fields you might need (timestamps, etc.)
}, { timestamps: true });

module.exports = mongoose.model('Speech', speechSchema);
