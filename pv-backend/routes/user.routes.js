const { authJwt } = require("../middlewares");
const { verifyCampaign } = require("../middlewares");
const { verifyGroup } = require("../middlewares");
const controller = require("../controllers/user.controller");
const multer = require('multer');

const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});
const excelUploads = multer({ storage: excelStorage });

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

  app.post("/groups",
    [verifyGroup.checkGroupExisted],
    controller.createGroup);

  app.get("/groups/:companyId", controller.getGroups);

  app.get("/groups/list/:companyId", controller.getCompanyTargetList);

  app.get("/groups-target-list", controller.getGroupTargetList);

  app.get("/target-users/:userId", controller.getTargetUser);

  app.put("/groups/:groupId", controller.updateGroup);

  app.delete("/groups/:groupId/:panelGroupID", controller.deleteGroup);

  app.post("/campaigns", 
    [verifyCampaign.checkCampaignExisted],
    controller.createCampaign);

  app.get("/campaigns/:companyId", controller.getCampaigns);

  app.put("/campaigns/:campaignId", controller.updateCampaign);

  app.put("/campaigns/status/:campaignId", controller.updateCampaignStatus);

  app.get("/campaigns/campaign/:campaignId", controller.getCampaignById);

  app.get("/campaignsbyname/:name", controller.getCampaignByName);

  app.delete("/campaigns/:campaignId", controller.deleteCampaign);

  app.post("/sms", controller.createSms);

  app.get("/sms/:companyId", controller.getSms);

  app.put("/sms/:smsId", controller.updateSms);

  app.delete("/sms/:smsId", controller.deleteSms);

  app.post("/send-sms", controller.sendSms);

  app.get("/sms/campaign/:campaignId", controller.getCampaignSentSms);

  app.get("/sms/sent/:companyId", controller.getSentSms);

  app.post('/uploadExcelFile', excelUploads.single('file'), controller.uploadExcelFile);

  app.post('/target-user', controller.createTargetUser);

  app.delete('/target-user', controller.deleteTargetUser);

  app.put('/target-user/:targetUserId', controller.updateTargetUser);

  app.post('/createTemplate', controller.createTemplate);

  app.get('/getTemplate/:campaignId', controller.getTemplate);

  app.get('/getTemplates', controller.getTemplates);
};
