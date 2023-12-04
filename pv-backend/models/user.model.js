const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    password: String,
    companyName: String,
    companyAddress: String,
    mainUserDegree: String,
    numberOfScreens: Number,
    role: String,
  })
);

module.exports = User;
