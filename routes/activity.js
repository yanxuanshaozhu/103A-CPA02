const express = require('express');
const checkAuth = require('./checklogin.js');
const router = express.Router();
const Activity = require('../models/Activity');

router.use(checkAuth);

/* GET home page. */
router.get('/', async (req, res, next) => {
  const data = await Activity.find({ email: req.session.email });
  res.render('activity', { title: 'Financial Tracker', data: data, status: req.session.logined });
});

router.get('/add', (req, res, next) => {
  res.render('add', { title: 'Financial Tracker', status: req.session.logined });
});

router.post('/add', async (req, res, next) => {
  const data = {
    date: req.body.date, location: req.body.location, category: req.body.category,
    amount: req.body.amount, description: req.body.description, email: req.session.email
  };
  const activityModel = new Activity(data);
  activityModel.save((err, doc) => {
    if (doc) {
      res.redirect('/activity');
    }
  });
});


router.get('/show', async (req, res, next) => {
  const colors = ['red', 'yellow', 'lime', 'cyan', 'Magenta', 'black',
    'purple', 'pink', 'apricot', 'beige', 'olive', 'teal']

  const pieTmp = await Activity.aggregate([
    {
      $match: {
        email: req.session.email
      }
    },
    {
      '$group': {
        '_id': '$category',
        'total': {
          '$sum': '$amount'
        }
      }
    }
  ]);
  const pieColors = colors.slice(0, pieTmp.length);
  const pieLabels = pieTmp.map(x => x._id);
  const pieInnerData = pieTmp.map(x => x.total);
  const pieData = { labels: pieLabels, datasets: [{ data: pieInnerData, backgroundColor: pieColors, label: 'Categorized spending in dollars', }] };

  const barTmp = await Activity.aggregate([
    {
      $match: {
        email: req.session.email
      }
    },
    {
      '$group': {
        '_id': {
          '$substr': [
            '$date', 0, 7
          ]
        },
        'total': {
          '$sum': '$amount'
        }
      }
    }, {
      '$sort': {
        '_id': 1
      }
    }
  ]);
  const barColors = colors.slice(0, barTmp.length);
  const barLabels = barTmp.map(x => x._id);
  const barInnerData = barTmp.map(x => x.total);
  const barData = { labels: barLabels, datasets: [{ data: barInnerData, backgroundColor: barColors, label: 'Monthly spending', }] };

  res.render('show', { title: 'Financial Tracker', pieData: pieData, barData: barData, status: req.session.logined });
})

module.exports = router;
