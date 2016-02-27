var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    userModel = require('./models/user'),
    LocalStrategy = require('passport-local').Strategy,
    i18n = require("i18n"),
    app = express();


mongoose.connect('mongodb://localhost/angular-products-management');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'pl'],

  defaultLocale: 'pl',

  // sets a custom cookie name to parse locale settings from
  cookie: 'apm-language',

  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales'
});

// you will need to use cookieParser to expose cookies to req.cookies
app.use(cookieParser());

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'angularproductsmanagementsecretsession' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.locals.__ = i18n.__;
app.locals.__n = i18n.__n;

require('./config/passport')(passport)
passport.use('local', new LocalStrategy(
    {
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        userModel.findOne({ 'username' :  username }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, req.flash('loginUsername', i18n.__('No user found')));
            }

            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginPassword', 'Oops! Wrong password.'));
            }

            return done(null, user);
        });
    }
));

require('./routes')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
