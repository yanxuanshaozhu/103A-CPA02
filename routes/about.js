const express = require('express');
const router = express.Router();


router.get('/', function (req, res, next) {
  res.render('about', { title: 'Financial Tracker', status: req.session.logined });
});

module.exports = router;
