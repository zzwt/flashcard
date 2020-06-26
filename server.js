const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Set body parser middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the flashcard API..." });
});

// Api Route
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/decks", require("./routes/decks"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
});
