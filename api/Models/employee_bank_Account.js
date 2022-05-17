const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emp_bank_AccountSchema = new Schema({

    empId: {
        type: String,
        required: true,
        unique: true,
    },

    accountNumber: {
        type: String,
        required: true,
    },

    bankName:{
        type: String,
        required: true
    },

    branch:{
        type: String,
        required: true
    },

    timeStamp:{
        type: String,
        required: true,
    },
});
const emp_bank_Account_Schema = mongoose.model('emp_bank_Account', emp_bank_AccountSchema);
module.exports = emp_bank_Account_Schema;