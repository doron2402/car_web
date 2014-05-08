var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes');
var path = require('path');
var mongodbObj = require('./lib/mongodb');
var config = require('./settings/config.json');
var User = mongodbObj.userModel;

if (process.env.ENV) {
  config = config[process.env.ENV];
} else {
  config = config.dev;
}

config.port = process.env.PORT || 5000;


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
//
//   Both serializer and deserializer edited for Remember Me functionality
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findOne( { email: email } , function (err, user) {
    done(err, user);
  });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(function(username, password, done) {

  User.findOne({ username: username }, function(err, user) {
    console.log(user);
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username, user: ''}); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password', user: '' });
      }
    });
  });
}));


var app = express();

// configure Express
app.configure(function() {
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs-locals'));
  app.set('layout', 'layouts/default');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' })); // CHANGE THIS SECRET!
  // Remember Me middleware
  app.use( function (req, res, next) {
    if ( req.method == 'POST' && req.url == '/login' ) {
      if ( req.body.rememberme ) {
        req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
      } else {
        req.session.cookie.expires = false;
      }
    }
    next();
  });
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});


app.get('/', function(req, res){
  res.render('pages/pre_lanch', { title: 'Tracky - Coming Soon', user: req.user });
});

app.get('/home', routes.SiteRoute.getHomePage);

app.get('/profile', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.post('/signup/soon', routes.SiteRoute.signupForEarlyLanch);

app.get('/dashboard', ensureAuthenticated, routes.DashboardRoute.getMainDashboard);


//Dashboard routes:
//app.get('/users/info', ensureAuthenticated, routes.DashboardRoute.getUserInfo);

app.get('/login', function(req, res){
  res.render('pages/login', { title: 'Tracky - login', user: req.user, message: req.session.messages });
});


//Dashboard Pages
app.get('/dashboard/security',ensureAuthenticated, routes.DashboardRoute.getSecurityDashboard);
app.get('/dashboard/routes',ensureAuthenticated, routes.DashboardRoute.getRoutesPage);
app.get('/dashboard/notifications',ensureAuthenticated, routes.DashboardRoute.getNotificationPage);
app.get('/dashboard/bugs',ensureAuthenticated, routes.DashboardRoute.getBugsPage);
app.get('/dashboard/users',ensureAuthenticated, routes.DashboardRoute.getUsersPage);
app.get('/dashboard/settings',ensureAuthenticated, routes.DashboardRoute.getSettingPage);
app.get('/cars', ensureAuthenticated, routes.CarsRoute.getAllCars);
app.get('/cars/:car_id', ensureAuthenticated, routes.CarsRoute.getCar);
app.get('/cars/:car_id/routes/:route_id', ensureAuthenticated, routes.CarsRoute.getRoute);
app.get('/cars/:car_id/routes', ensureAuthenticated, routes.CarsRoute.getAllRoute);
app.get('/dashboard/map',ensureAuthenticated, routes.DashboardRoute.getMapPage);
app.get('/dashboard/chart1',ensureAuthenticated, routes.DashboardRoute.getChart1Page);

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
//
/***** This version has a problem with flash messages
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });
*/

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/home')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      //return res.redirect('/', {user: req.user});
      return res.render('pages/home', {user: req.user});
    });
  })(req, res, next);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(config.port, function() {
  console.log('Express server listening on port '+ config.port);
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
