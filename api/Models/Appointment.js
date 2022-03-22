const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    consultant: {
        type: String,
        required: true,
    },
    appdate: {
        type: String,
        required: true,
    },
    apptime: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);