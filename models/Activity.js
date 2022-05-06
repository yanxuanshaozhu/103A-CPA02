'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var activitySchema = Schema({
    date: Date,
    location: String,
    category: {
        type: String,
        enum: ['Housing', 'Transportation', 'Food', 'Utilities',
            'Clothing', 'Healthcare', 'Education', 'Entertainment', 'Other']
    },
    amount: Number,
    description: String

});



module.exports = mongoose.model('Activity', activitySchema);