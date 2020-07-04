const express = require("express");
const router = express.Router();
const Deck = require("../models/Deck");
const auth = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
// @route   GET api/decks
// @desc    Get all decks for a user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const decks = await Deck.find({ user: req.user.id }).sort({
      date: -1,
      deleted: false,
    });
    return res.json(decks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/decks
// @desc    Add a new deck
// @access  Private
router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, cards } = req.body;
    try {
      const newDeck = new Deck({
        title,
        description,
        cards,
        user: req.user.id,
      });

      const deck = await newDeck.save();
      return res.json(deck);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route   PUT api/decks/:id
// @desc    Update deck
// @access  Private
router.patch(
  "/:id",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, cards } = req.body;
    try {
      const updateDeck = await Deck.findOneAndUpdate(
        { user: req.user.id, _id: mongoose.mongo.ObjectId(req.params.id) },
        { ...req.body },
        { upsert: true }
      );

      // const deck = await newDeck.save();
      return res.json(updateDeck);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route   DELETE api/decks/:id
// @desc    Delete deck
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedDeck = await Deck.updateOne(
      {
        user: req.user.id,
        _id: mongoose.mongo.ObjectId(req.params.id),
      },
      {
        deleted: true,
      }
    );
    res.json(deletedDeck);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
