const mongoose = require('mongoose');

const empPaymentSchema = new mongoose.Schema({
    paymentId: {
        type: Number,
        required: true,
    },
    employeeId: {
        type: Number,
        required: true,
    },
    employeeType: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    paymentAmount: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: String,
        required: true,
    },
    paymentAccount: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    paymentBank: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('EmpPayment', empPaymentSchema);