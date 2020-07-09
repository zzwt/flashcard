const mongoose = require("mongoose");
// const DeckSchema = require("./Deck");

const DeckGroupSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  decks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "decks" }],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("deck_groups", DeckGroupSchema);
