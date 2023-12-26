const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/test/all", controller.allAccess);

  app.get("/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get("/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  app.post("/groups", controller.createGroup);

  app.get("/groups/:companyId", controller.getGroups);

  app.get("/groups/list/:companyId", controller.getGroupList);

  app.post("/campaigns", controller.createCampaign);

  app.get("/campaigns/:companyId", controller.getCampaigns);

  app.put("/campaigns/:campaignId", controller.updateCampaign);

  app.post("/sms", controller.createSms);

  app.get("/sms/:companyId", controller.getSms);

  app.put("/sms/:smsId", controller.updateSms);
};
