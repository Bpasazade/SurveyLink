const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.usertypes = require("./user.type.model");
db.company = require("./company.model");

db.ROLES = ["user", "admin"];
db.USERTYPES = ["master", "slave"];

module.exports = db;