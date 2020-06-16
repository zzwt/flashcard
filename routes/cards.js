const express = require("express");
const router = express.Router();


// @route   GET api/cards
// @desc    Get all cards for a user
// @access  Private
router.get("/", (req, res) => {
  res.send("Get all cards");
});


// @route   POST api/cards
// @desc    Add a new card
// @access  Private
router.post("/", (req, res) => {
  res.send("Add card");
});


// @route   PUT api/cards/:id
// @desc    Update card
// @access  Private
router.post("/:id", (req, res) => {
  res.send("Update card");
});



// @route   DELETE api/cards/:id
// @desc    Delete card
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete card");
});

module.exports = router;