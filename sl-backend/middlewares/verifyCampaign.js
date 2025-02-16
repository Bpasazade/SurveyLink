const db = require("../models");
const Campaign = db.campaign;

checkCampaignExisted = (req, res, next) => {
    Campaign.findOne({
        name: req.body.name
    }).exec((err, campaign) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (campaign) {
            res.status(400).send({ message: "Failed! Campaign already exists!" });
            return;
        }

        next();
    });
}

const verifyCampaign = {
  checkCampaignExisted
};

module.exports = verifyCampaign;