const { authJwt } = require("../middlewares");
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

  app.post("/groups", controller.createGroup);

  app.get("/groups/:companyId", controller.getGroups);

  app.get("/groups/list/:companyId", controller.getCompanyTargetList);

  app.get("/groups-target-list", controller.getGroupTargetList);

  app.get("/target-users/:userId", controller.getTargetUser);

  app.put("/groups/:groupId", controller.updateGroup);

  app.post("/campaigns", controller.createCampaign);

  app.get("/campaigns/:companyId", controller.getCampaigns);

  app.put("/campaigns/:campaignId", controller.updateCampaign);

  app.get("/campaigns/campaign/:campaignId", controller.getCampaignById);

  app.get("/campaignsbyname/:name", controller.getCampaignByName);

  app.post("/sms", controller.createSms);

  app.get("/sms/:companyId", controller.getSms);

  app.put("/sms/:smsId", controller.updateSms);

  app.post("/send-sms", controller.sendSms);

  app.post('/uploadExcelFile', excelUploads.single('file'), controller.uploadExcelFile);
};
