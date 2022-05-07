const express = require('express');
const router = express.Router();
const User = require('../models/User');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login', msg: "", status: req.session.logined });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login', msg: "", status: req.session.logined });
});

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Register', msg: "", status: req.session.logined });
});

router.post('/login', (req, res, next) => {
  const data = { email: req.body.email, username: req.body.username, password: req.body.password };
  User.findOne(data, (err, doc) => {
    if (doc) {
      req.session.email = req.body.email;
      req.session.logined = true;
      res.redirect('/activity');
    } else {
      let msg = "User not found in database, please register first";
      req.session.logined = false;
      res.render('login', { title: 'Login', msg: msg, status: req.session.logined });
    }
  });
});

router.post('/register', (req, res, next) => {
  const data = { email: req.body.email, username: req.body.username, password: req.body.password };
  User.findOne({ email: data.email }, (err, doc) => {
    if (doc) {
      let msg = "User found in database, please login";
      req.session.logined = false;
      res.render('register', { title: 'Login', msg: msg, status: req.session.logined });
    } else {
      const userModel = new User(data);
      userModel.save((err, doc) => {
        if (doc) {
          req.session.email = req.body.email;
          req.session.logined = true;
          res.redirect('/activity');
        }
      });
    }
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
