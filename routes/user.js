const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login', msg: "" });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login', msg: "" });
});

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Register', msg: "" });
});

router.post('/login', (req, res, next) => {
  const data = { email: req.body.email, username: req.body.username, password: req.body.password };
  User.findOne(data, (err, doc) => {
    if (doc) {
      res.render('activity', { title: "Financial Tracker" });
    } else {
      let msg = "User not found in database";
      res.render('login', { title: 'Login', msg: msg });
    }
  });
});

router.post('/register', (req, res, next) => {
  const data = { email: req.body.email, username: req.body.username, password: req.body.password };
  User.findOne(data, (err, doc) => {
    if (doc) {
      let msg = "User found in database, please login";
      res.render('login', { title: 'Login', msg: msg });
    } else {
      const userModel = new User(data);
      userModel.save((err, doc) => {
        if (doc) {
          res.render('activity', { title: "Financial Tracker" });
        }
      });
    }
  });
});
module.exports = router;
