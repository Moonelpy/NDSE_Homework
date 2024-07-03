const Books = require ('../models/Books')
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  const books = await Books.find();
  res.render("index", {
    title: "Библиотека",
    books: books,
    user: req.user,
  });
});

module.exports = router;