var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');
var five = require('johnny-five');

var level0 = 1000;
var level1 = 1000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('level0', level0);
app.set('level1', level1);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var board = new five.Board();

board.on('ready', function() {
    var sensor0 = new five.Sensor({
        pin: 2,
        type: "digital",
        freq: 1
    });

    var sensor1 = new five.Sensor({
        pin: 3,
        type: "digital",
        freq: 1
    });

    sensor0.on('change', function() {
      level0--;
      app.set('level0', level0);
    });

    sensor1.on('change', function() {
        level1--;
        app.set('level1', level1);
    });
});

module.exports = app;
