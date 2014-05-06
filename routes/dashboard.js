var DashboardRoute = {};

DashboardRoute.getMainDashboard = function(req, res) {
  console.log(req.user);
  res.render('dashboard/home', {title: 'Welcome back ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-home' }});
};

DashboardRoute.getSecurityDashboard = function(req, res) {
  res.render('dashboard/security', {title: 'Trackey - Security ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-security' }});
};

DashboardRoute.getRoutesPage = function(req, res) {
	res.render('dashboard/routes', {title: 'Trackey - Routes ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-routes' }});
};

DashboardRoute.getNotificationPage = function(req, res) {
	res.render('dashboard/notification', {title: 'Trackey - Notification ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-notification' }});
};

DashboardRoute.getBugsPage = function(req, res) {
	res.render('dashboard/bugs', {title: 'Trackey - Bugs ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-bugs' }});
};

DashboardRoute.getUsersPage = function(req, res) {
	res.render('dashboard/users', {title: 'Trackey - Users ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-users' }});
};

DashboardRoute.getSettingPage = function(req, res) {
	res.render('dashboard/settings', {title: 'Trackey - Settings ' + req.user.username, user: req.user, active: { side_nav: 'side-nav-settings' }});
};

module.exports = DashboardRoute;