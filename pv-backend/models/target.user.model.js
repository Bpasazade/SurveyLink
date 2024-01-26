const mongoose = require('mongoose');

const TargetUser = mongoose.model(
    'TargetUser',
    new mongoose.Schema({
        name: String,
        phoneNumber: String,
        location: String,
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        panelGroupID: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    })
);

module.exports = TargetUser;