const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkDuplicatePhoneNumber,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);

  app.get('/users', controller.getAllUsers);

  app.delete('/users/:id', controller.deleteUser);

  app.put('/users/:id', controller.updateUser);

  app.get("/users/:id", controller.getUser);

  app.get("/users-all/:companyId", controller.getUsersByCompanyId);

  app.get('/auth/signout', controller.signout);
};
