const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const path = require('path');
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './views')));

const db = require("./models");
const UserType = require("./models/user.type.model");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.render('index', { id: null });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/target.user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  UserType.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new UserType({
        name: "master"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'master' to usertypes collection");
      });

      new UserType({
        name: "slave"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'slave' to usertypes collection");
      });
    }
  });
}
