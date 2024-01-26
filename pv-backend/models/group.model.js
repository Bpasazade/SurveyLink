const mongoose = require('mongoose');

const Group = mongoose.model(
    "Group",
    new mongoose.Schema({
        name: String,
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        panelGroupID: String,
    })
);

module.exports = Group;