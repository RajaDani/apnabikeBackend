var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// user Routes Controllers
var indexRouter = require('./routes/client/bookings');
var userUsersRouter = require('./routes/client/users');
var userBikeRouter = require('./routes/client/bikes');
var userCityRouter = require('./routes/client/cities');
var userBookingRouter = require('./routes/client/bookings');
var userDashboardRouter = require('./routes/client/dashboard');

// admin Routes Controllers
var adminUserRouter = require('./routes/admin/users');
var adminBikeRouter = require('./routes/admin/bikes');
var adminCityRouter = require('./routes/admin/cities');
var adminRentRouter = require('./routes/admin/rent');
var adminBookingRouter = require('./routes/admin/bookings');
var adminDashboardRouter = require('./routes/admin/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// user Routes

app.use('/client/users', userUsersRouter);
app.use('/client/bikes', userBikeRouter);
app.use('/client/city', userCityRouter);
app.use('/client/bookings', userBookingRouter);
app.use('/client/dashboard', userDashboardRouter);

// admin Routes

app.use('/admin/rent', adminRentRouter);
app.use('/admin/dashboard', adminDashboardRouter);
app.use('/admin/users', adminUserRouter);
app.use('/admin/bikes', adminBikeRouter);
app.use('/admin/city', adminCityRouter);
app.use('/admin/bookings', adminBookingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
