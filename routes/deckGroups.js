const express = require("express");
const router = express.Router();
const DeckGroup = require("../models/DeckGroup");
const auth = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
// @route   GET api/deck-groups
// @desc    Get all deck groups for a user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const deckGroups = await DeckGroup.find({ user: req.user.id }).sort({
      date: -1,
    });
    return res.json(deckGroups);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route   GET api/deck-groups/:id
// @desc    Get a single deck group for a user
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const deckGroup = await DeckGroup.findOne({
      user: req.user.id,
      _id: mongoose.mongo.ObjectId(req.params.id),
    });
    if (deckGroup) return res.json(deckGroup);
    return res.status(400).json({ msg: "Deck Group Not Find" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/deck-groups
// @desc    Add a new deck group
// @access  Private
router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, decks } = req.body;
    try {
      const newDeckGroup = new DeckGroup({
        title,
        description,
        decks,
        user: req.user.id,
      });

      const deckGroup = await newDeckGroup.save();
      return res.json(deckGroup);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route   PUT api/deck-groups/:id
// @desc    Update deck group
// @access  Private
router.patch(
  "/:id",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, decks } = req.body;
    try {
      const updateDeckGroup = await DeckGroup.findOneAndUpdate(
        { user: req.user.id, _id: mongoose.mongo.ObjectId(req.params.id) },
        { ...req.body },
        { upsert: true }
      );

      return res.json(updateDeckGroup);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route   DELETE api/deck-groups/:id
// @desc    Delete deck group
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedDeckGroup = await DeckGroup.remove({
      user: req.user.id,
      _id: mongoose.mongo.ObjectId(req.params.id),
    });
    return res.json(deletedDeckGroup);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
