const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const data = await Activity.find();
  res.render('activity', { title: 'Financial Tracker', data: data });
});

router.get('/add', (req, res, next) => {
  res.render('add', { title: 'Financial Tracker' });
});

router.post('/add', async (req, res, next) => {
  const data = { date: req.body.date, location: req.body.location, category: req.body.category, amount: req.body.amount, description: req.body.description };
  const activityModel = new Activity(data);
  activityModel.save((err, doc) => {
    if (doc) {
      res.redirect('/activity');
    }
  });
});

const pieAggr = [
  {
    '$group': {
      '_id': '$category',
      'total': {
        '$sum': '$amount'
      }
    }
  }
]

const barAggr = [
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
  }
]

router.get('/show', async (req, res, next) => {
  const colors = ['red', 'yellow', 'lime', 'cyan', 'Magenta', 'black',
    'purple', 'pink', 'apricot', 'beige', 'olive', 'teal']
    
  const pieTmp = await Activity.aggregate(pieAggr);
  const pieColors = colors.slice(0, pieTmp.length);
  const pieLabels = pieTmp.map(x => x._id);
  const pieInnerData = pieTmp.map(x => x.total);
  const pieData = { labels: pieLabels, datasets: [{ data: pieInnerData, backgroundColor: pieColors, label: 'Categorized spending in dollars', }] };
  
  const barTmp = await Activity.aggregate(barAggr);
  const barColors = colors.slice(0, barTmp.length);
  const barLabels = barTmp.map(x => x._id);
  const barInnerData = barTmp.map(x => x.total);
  const barData = { labels: barLabels, datasets: [{ data: barInnerData, backgroundColor: barColors, label: 'Monthly spending in dollars', }] };

  res.render('show', { title: 'Financial Tracker', pieData: pieData, barData: barData });
})

module.exports = router;
