const mongoose = require('mongoose');

const Sms = mongoose.model(
    "Sms",
    new mongoose.Schema({
        message: String,
        date: String,
        groupId: String,
        companyId: String,
    })
);

module.exports = Sms;