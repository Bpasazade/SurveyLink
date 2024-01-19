const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const UserType = db.usertypes;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { mongo } = require("mongoose");

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    mainUserDegree: req.body.mainUserDegree,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    company: req.body.company,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
    userType: req.body.userType,
  });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (req.body.role) {
        Role.find(
          {
            name: { $in: req.body.role }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.role = req.body.role;
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          // role name
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      }

      // if (req.body.userType) {
      //   UserType.find(
      //     {
      //       name: { $in: req.body.userType }
      //     },
      //     (err, usertypes) => {
      //       if (err) {
      //         res.status(500).send({ message: err });
      //         return;
      //       }

      //       user.userType = req.body.userType;
      //       user.save(err => {
      //         if (err) {
      //           res.status(500).send({ message: err });
      //           return;
      //         }

      //         res.send({ message: "User was registered successfully!" });
      //       });
      //     }
      //   );  
      // } else {
      //   UserType.findOne({ name: "slave" }, (err, usertype) => {
      //     if (err) {
      //       res.status(500).send({ message: err });
      //       return;
      //     }
      //     // role name
      //     user.usertype = [usertype._id];
      //     user.save(err => {
      //       if (err) {
      //         res.status(500).send({ message: err });
      //         return;
      //       }

      //       res.send({ message: "User was registered successfully!" });
      //     });
      //   });
      // }
    }
  );
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: req.body.rememberMe ? '7d' : '1d'
                              });

      var authorities = [];
      authorities.push("ROLE_" + user.role.toUpperCase());
      
      res.status(200).send({
        id: user._id,
        email: user.email,
        company: user.company,
        role: authorities,
        userType: user.userType,
        accessToken: token
      });
    });
};

exports.getAllUsers = async (req, res) => {
  try {
    // const roleName = "user";
    // const users = await User.find({ role: roleName });
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Sign out user by using jwt token
exports.signout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { accessToken: null });
    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing out user', error: error.message });
  }
};

// Accounts
exports.getUsersByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;
    const users = await User.find({ company: companyId, role: "user" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};