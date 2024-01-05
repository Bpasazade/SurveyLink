const controller = require("../controllers/admin.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/companies', controller.getAllCompanies);

    app.post('/companies', controller.registerCompany);

    app.get('/companies/:id', controller.getCompany);

    app.get('/companiesbyname/:name', controller.getCompanyByName);

    app.put('/companies/:id', controller.updateCompany);

    app.delete('/companies/:id', controller.deleteCompany);

    app.get('/campaigns', controller.getAllCampaigns);
}