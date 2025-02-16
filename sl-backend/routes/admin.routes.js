const controller = require("../controllers/admin.controller");
const { verifyCompany } = require("../middlewares");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'templates')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/companies', controller.getAllCompanies);

    app.post('/companies',
        [verifyCompany.checkCompanyExisted],
        controller.registerCompany);

    app.get('/companies/:id', controller.getCompany);

    app.get('/companiesbyname/:name', controller.getCompanyByName);

    app.put('/companies/:_id', controller.updateCompany);

    app.delete('/companies/:id', controller.deleteCompany);

    app.get('/campaigns', controller.getAllCampaigns);

    app.post('/templates', controller.checkToken, upload.single('template'), controller.uploadTemplate);

    app.get('/actions', controller.getActions);

    app.get('/sentAllSms', controller.getAllSentSms);

    app.get('/getAllVideoSeen', controller.getAllVideoWatched);

    app.get('/getAllAnswerCount', controller.getAllAnswerCount);
}