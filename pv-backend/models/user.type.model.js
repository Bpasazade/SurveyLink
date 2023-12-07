const mongoose = require("mongoose");

const UserType = mongoose.model(
    "UserType",
    new mongoose.Schema({
        name: String,
    })
);

module.exports = UserType;