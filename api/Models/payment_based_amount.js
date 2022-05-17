const mongoose = require('mongoose');

const paymentBasedAmountSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        unique: true,
    },
    basedAmount: {
        type: String,
        required: true,
    },
    otPayment: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('paymentBasedAmount', paymentBasedAmountSchema);