var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');
let fs = require('fs');
let favicon = require('serve-favicon');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let login = require("./routes/login");
let signUp = require("./routes/signUp");
let setUser = require("./setUser");
let status = require("./routes/status");
let inn = require("./routes/inn");
let bank = require("./routes/bank");
let vsMonster = require("./routes/vsMonster");
let weaponShop = require("./routes/weaponShop");
let armorShop = require("./routes/armorShop");
let accessoryShop = require("./routes/accessoryShop");
let changeJob = require("./routes/changeJob");
let changeArts = require("./routes/changeArts");
let changeStatus = require("./routes/changeStatus");
let equipmentStorage = require("./routes/equipmentStorage");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "keyboard cat",
  resave: "false",
  saveUninitialized: true
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/login", setUser,login);
app.use("/signUp", signUp);
app.use("/status", status);
app.use("/inn",  inn);
app.use("/bank",  bank);
app.use("/vsMonster", vsMonster);
app.use("/weaponShop", weaponShop);
app.use("/armorShop", armorShop);
app.use("/accessoryShop", accessoryShop);
app.use("/changeJob", changeJob);
app.use("/changeArts", changeArts);
app.use("/changeStatus", changeStatus);
app.use("/equipmentStorage", equipmentStorage);

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

module.exports = app;
