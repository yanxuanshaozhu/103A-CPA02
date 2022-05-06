'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = Schema({
    email: String,
    username: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);