const express = require('express');
const router = express.Router();

/* GET Main page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Financial Tracker', status: req.session.logined });
});

module.exports = router;
