const express = require("express");
const bcrypt = require("bcryptjs");
const { jwtSign } = require("../utils");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../models/User");

// @route   Post api/users
// @desc    Register a user
// @access  Private
router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = await jwtSign(payload);
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports = router;
