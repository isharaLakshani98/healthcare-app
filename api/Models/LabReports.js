const mongoose = require('mongoose');

const labreportSchema = new mongoose.Schema({
    fullname: {
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
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    datecollected: {
        type: String,
        required: true,
    },
    hemoglobin: {
        type: String,
        required: true,
    },
    rbc: {
        type: String,
        required: true,
    },
    hct: {
        type: String,
        required: true,
    },
    mcv: {
        type: String,
        required: true,
    },
    mch: {
        type: String,
        required: true,
    },
    mchc: {
        type: String,
        required: true,
    },
    rdwcv: {
        type: String,
        required: true,
    },
    rdwsd: {
        type: String,
        required: true,
    },
    wbc: {
        type: String,
        required: true,
    },
    neu: {
        type: String,
        required: true,
    },
    lym: {
        type: String,
        required: true,
    },
    mon: {
        type: String,
        required: true,
    },
    eos: {
        type: String,
        required: true,
    },
    bas: {
        type: String,
        required: true,
    },
    lym2: {
        type: String,
        required: true,
    },
    gra: {
        type: String,
        required: true,
    },
    plt: {
        type: String,
        required: true,
    },
    esr: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('LabReports', labreportSchema);