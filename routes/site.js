var SiteRoute = {};

SiteRoute.getHomePage = function(req, res){
	res.render('pages/home', {title: 'Welcome', user: req.user});
};

module.exports = SiteRoute;
