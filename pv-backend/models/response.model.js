const mongoose = require('mongoose');

const Response = mongoose.model(
    "Response",
    new mongoose.Schema({
        targetUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TargetUser"
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign"
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        answer: String,
    })
);

module.exports = Response;