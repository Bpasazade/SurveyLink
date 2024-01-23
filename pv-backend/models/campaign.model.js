const mongoose = require('mongoose');

const Campaign = mongoose.model(
    "Campaign",
    new mongoose.Schema({
        name: String,
        templateName: String,
        description: String,
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        groups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Group"
            }
        ],
        status: String,
    })
);

module.exports = Campaign;