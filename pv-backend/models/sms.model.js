const mongoose = require('mongoose');

const Sms = mongoose.model(
    "Sms",
    new mongoose.Schema({
        title: String,
        message: String,
        date: String,
        campaignId: String,
        groupId: String,
        companyId: String,
    })
);

module.exports = Sms;