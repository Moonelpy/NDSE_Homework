const express = require('express');
const Books = require('../models/Books');

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Books.find();
  res.render('index', {
    title: 'Библиотека',
    books,
    user: req.user,
  });
});

module.exports = router;
