var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongodb = require('./config/mongodb');

var indexRoute = require('./routes/indexRoute');
var keyvalRoute = require('./routes/keyvalRoute');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/object', keyvalRoute);
app.use(function(req, res, next) {
  var err = new Error('not found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var isDev = app.get('env') === 'development';
  if (isDev) {
    res.locals.errorMessage = err.message;
    res.locals.errorStack = err;
  } else if (res.status < 500){
    res.locals.errorMessage = err.message;
    res.locals.errorStack = {};
  } else {
    res.locals.errorMessage = 'there is something wrong with the server';
    res.locals.errorStack = {};
  }

  res.json({
    'error': {
      status: res.status,
      msg: res.locals.errorMessage,
      errorStack: res.locals.errorStack
    }
  });
});


module.exports = app;
