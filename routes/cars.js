var CarsRoute = {};

// /cars/all
CarsRoute.getAllCars = function(req, res) {
  console.log(req);
  return res.json(200, { error: null, data: 'OK' });
};

CarsRoute.getCar = function (req, res) {
	if (req.params && req.params.car_id && !isNaN(req.params.car_id)){
		return res.json(200, { error: null, data: 'OK', car_id: req.params.car_id });
	}

	return res.json(500, { error: 'user id is required!'});
};

CarsRoute.getAllRoute = function(req, res) {
	console.log(req);
	return res.json(200, { error: null, data: 'OK' });
};

CarsRoute.getRoute = function(req, res) {
	if (req.params && req.params.route_id && !isNaN(req.params.route_id)){
		return res.json(200, { error: null, data: 'OK', car_id: req.params.car_id, route_id: req.params.route_id });
	}
	return res.json(500, { error: 'user id is required!'});
};

// POST /login
module.exports = CarsRoute;