const mongoose = require('mongoose');
const Campaign = require('./campaign.model');

const Template = mongoose.model(
    'Template',
    new mongoose.Schema({
        name: String,
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Campaign
        },
        options: [String],
    })
);

module.exports = Template;