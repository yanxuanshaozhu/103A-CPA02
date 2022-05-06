const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require("http");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const aboutRouter = require('./routes/about');
const activityRouter = require('./routes/activity');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const mongoose = require( 'mongoose' );

const mongodb_URI = "mongodb+srv://albertli:asdfBNM789@cluster0.ioufy.mongodb.net/financialTracker?retryWrites=true&w=majority";
mongoose.connect( mongodb_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/about', aboutRouter);
app.use('/activity', activityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = "5000";
app.set("port", port);
const server = http.createServer(app);
server.listen(port);


module.exports = app;
