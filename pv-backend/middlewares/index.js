const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyCompany = require("./verifyCompany");
const verifyCampaign = require("./verifyCampaign");
const verifyGroup = require("./verifyGroup");

module.exports = {
  authJwt,
  verifySignUp,
  verifyCompany,
  verifyCampaign,
  verifyGroup
};