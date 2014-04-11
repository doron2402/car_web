var SiteRoute = {};
var mongodbObj = require('../lib/mongodb');
var validator = require('validator');

SiteRoute.getHomePage = function(req, res){
	res.render('pages/home', {title: 'Welcome', user: req.user});
};

SiteRoute.signupForEarlyLanch = function(req, res){
	if (req.body && req.body.email && validator.isEmail(req.body.email) ) {
		//Store in mongo or mysql
		var client = new mongodbObj.clientModel({ email: req.body.email});
		client.save(function(err) {
		  if(err) {
		    console.log(err);
		  } else {

		    console.log('user: ' + client.email + " saved.");
		    return res.json({code:'OK', data:'Thanks, we will contact you soon. ' + req.body.email});
		  }
		});
	}else {
		return res.json({code: false, error: 'Something went wrong'});
	}
};


module.exports = SiteRoute;
