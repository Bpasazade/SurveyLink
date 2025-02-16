const mongoose = require('mongoose');

const Sms = mongoose.model(
    "Sms",
    new mongoose.Schema({
        title: String,
        message: String,
        campaignId: String,
        groupId: String,
        companyId: String,
        sent: Boolean,
    })
);

module.exports = Sms;