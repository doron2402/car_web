var SiteRoute = {};
var validator = require('validator');

SiteRoute.getHomePage = function(req, res){
	res.render('pages/home', {title: 'Welcome', user: req.user});
};

SiteRoute.signupForEarlyLanch = function(req, res){
	if (req.body && req.body.email && validator.isEmail(req.body.email) ) {
		//Store in mongo or mysql
		res.json({code:'OK', data:'Thanks, we will contact you soon. ' + req.body.email});	
	}else {
		res.json({code: false, error: 'Something went wrong'});
	}
};


module.exports = SiteRoute;
