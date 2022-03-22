const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    marital: {
        type: String,
    },
    position: {
        type: String,
        required: true,
    },
    hiredate: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);