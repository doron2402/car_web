var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var config = require('../settings/config.json');

if (process.env.ENV) {
	switch(process.env.ENV) {
		case "staging":
			config = config[process.env.ENV];
			mongoose.connect(process.env.MONGOHQ_URL);
			break;
		case "production":
			config = config[process.env.ENV];
			mongoose.connect(process.env.MONGOHQ_URL);
			break;
		defualt:
			config = config.dev;
			mongoose.connect(config.mongodb.host, config.mongodb.db);
			break;
	}
} else {
  	config = config.dev;
	mongoose.connect(config.mongodb.host, config.mongodb.db);
}


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});


// User Schema
var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true}
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

// Bcrypt middleware
userSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});
var UserModel = mongoose.model('User', userSchema);

//Client Schema - user who signup pre service
var clientSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true, unique: true, lowercase: true }
});
var ClientModel = mongoose.model('Client', clientSchema);

exports.db = db;
exports.userSchema = userSchema;
exports.userModel = UserModel;
exports.clientSchema = clientSchema;
exports.clientModel = ClientModel;
