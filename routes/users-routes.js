const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const upload = require("../middleware/upload");
const {
  verifyUser,
  verifyManager,
  verifyAdmin,
} = require("../middleware/auth");
const userController = require("../controllers/user-controller");
router.post("/", upload.single("userImage"), (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user != null) {
        return res.status(400).json({ error: "Email already exists" });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);

        const newUser = new User({
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          // image: "/user_images/" + req.file.filename,
          password: hash,
          role: req.body.role || "user",
        });

        newUser
          .save()
          .then((user) => {
            const data = {
              id: user._id,
              email: user.email,
              phoneNumber: user.phoneNumber,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              image: user.image,
            };
            return res
              .status(201)
              .json({ status: "User registration success.", data });
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(400)
              .json({ error: "Error saving user in database" });
          });
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Server Error" });
    });
});

router.post("/login/user", (req, res, next) => {
  const { email, phoneNumber, password } = req.body;

  // Find user by email or phone number
  User.findOne({
    $or: [{ email: email }, { phoneNumber: phoneNumber }]
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const data = {
          id: user._id,
          email: user.email,
          role: user.role,
        };
        const token = jwt.sign(data, process.env.SECRET, { expiresIn: "1y" });
        return res.json({ status: "Login Success", token });
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Server Error" });
    });
});


module.exports = router;
