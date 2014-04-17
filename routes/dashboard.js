var DashboardRoute = {};

DashboardRoute.getMainDashboard = function(req, res) {
  console.log(req.user);
  res.render('dashboard/home', {title: 'Welcome back ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-home' }});
};

DashboardRoute.getSecurityDashboard = function(req, res) {
  console.log(req.user);
  res.render('dashboard/security', {title: 'Trackey - Security ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-security' }});
};

module.exports = DashboardRoute;
