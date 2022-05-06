const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('about', { title: 'Financial Tracker' });
});

module.exports = router;
