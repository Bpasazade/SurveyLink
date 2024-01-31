const db = require("../models");
const Group = db.group;

checkGroupExisted = (req, res, next) => {
    Group.findOne({
        name: req.body.name
    }).exec((err, group) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (group) {
            res.status(400).send({ message: "Failed! Group already exists!" });
            return;
        }

        next();
    });
}

const verifyGroup = {
  checkGroupExisted
};

module.exports = verifyGroup;