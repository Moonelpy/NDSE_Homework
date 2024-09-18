const express = require('express');

const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const hasAuth = require('../../middleware/hasAuth');
require('../../config/passport');

router.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Ошибка регистрации пользователя');
  }
});

router.get('/signup', (req, res) => {
  res.render('user/signup');
});

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.get('/me', hasAuth, (req, res) => {
  res.render('user/profile', { user: req.user });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/mod/user/login',
}), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
