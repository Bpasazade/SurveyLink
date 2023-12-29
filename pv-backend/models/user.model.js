const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: String,
        email: String,
        phoneNumber: String,
        password: String,
        company: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
        },
        mainUserDegree: String,
        userType: String,
        role: String,
    })
);

module.exports = User;
