var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session') //--import this first
var flash = require('connect-flash')  //--connect flash add here for variable access 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//-------------session-------------
app.use(session({
  resave: false, //if same request comes from same id(leptop) then it is not save duplicate
  
  saveUninitialized:false,//if you want to not store extra storage in
                          // your session then   you have to perform this

  secret:"this is session"//this is secret string which is encrypt your data
  
}));

//------------------------ passport for authentication -----------

app.use(passport.initialize());  //--passport initized for authentication and authorization
app.use(passport.session());  //--passport session module on by writing this 
passport.serializeUser(usersRouter.serializeUser());// user checking and many more thing
passport.deserializeUser(usersRouter.deserializeUser()); //user checking and many more thing



//-------------------------flash packages ----------------

app.use(flash())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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

module.exports = app;
