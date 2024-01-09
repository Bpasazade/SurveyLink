const controller = require("../controllers/target.user.controller");

module.exports = function(app) {
    app.get('/:company/:campaign/:id', controller.getUserPage);

    app.get('/target-users/:id', controller.getUser);

    app.post('/answer', controller.saveAnswer);

    app.get('/survey', controller.getSurveyStats);
}