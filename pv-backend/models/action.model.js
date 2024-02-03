const mongoose = require('mongoose');

const Action = mongoose.model(
    "Action",
    new mongoose.Schema({
        date: String,
        day: String,
        action: String,
        company: String,
    })
);

module.exports = Action;