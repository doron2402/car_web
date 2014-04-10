var DashboardRoute = {};

DashboardRoute.getMainDashboard = function(req, res) {
  console.log(req.user);
  res.render('dashboard/home', {title: 'Welcome back ' + req.user.username, user: req.user});
};

module.exports = DashboardRoute;
