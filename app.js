var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

var apiRoutes = require('./app/apiRoutes');
dotenv.load();
var port = process.env.PORT || 8000;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL);
var app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes for the Api
app.get('/', function(req, res){
  res.send('Hello! The Api is listening at  http://localhost:' + port + '/api');
});
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  next(err);
  err.status = 404;
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

app.listen(port);
console.log("Listening at => http://localhost:" + port);

module.exports = app;
