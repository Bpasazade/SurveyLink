const mongoose = require('mongoose');

const TargetUser = mongoose.model(
    'TargetUser',
    new mongoose.Schema({
        name: String,
        phoneNumber: String,
        location: String,
    })
);

module.exports = TargetUser;