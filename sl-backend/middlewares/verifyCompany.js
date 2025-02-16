const db = require("../models");
const Company = db.company;

checkCompanyExisted = (req, res, next) => {
    Company.findOne({
        name: req.body.companyName
    }).exec((err, company) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (company) {
            res.status(400).send({ message: "Failed! Company already exists!" });
            return;
        }

        next();
    });
}   

const verifyCompany = {
  checkCompanyExisted
};

module.exports = verifyCompany;