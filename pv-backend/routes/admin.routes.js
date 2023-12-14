const controller = require("../controllers/admin.controller");
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

    app.get('/companies', controller.getAllCompanies);

    app.post('/companies', controller.registerCompany);

    app.get('/companies/:id', controller.getCompany);

    app.put('/companies/:id', controller.updateCompany);

    app.delete('/companies/:id', controller.deleteCompany);

    app.post('/uploadExcelFile', excelUploads.single('file'), controller.uploadExcelFile);
}