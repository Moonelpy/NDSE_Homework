const express = require("express");
const { booksInLibrary } = require("../db/collections/library");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Библиотека",
    books: booksInLibrary,
  });
});

module.exports = router;