const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middlewares/auth");
const { jwtSign } = require("../utils");

const { check, validationResult } = require("express-validator");

// @route   GET api/auth
// @desc    Login a user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").not().isEmpty().isEmail(),
    check("password", "Please is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credential" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credential" });
      }

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
