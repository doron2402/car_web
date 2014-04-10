var mongodb = require('mongodb');
var mongoose = require('mongoose');
var config = require('../settings/config.json');

if (process.env.ENV) {
  config = config[process.env.ENV];
} else {
  config = config.dev;
}
console.log('Generate users...');
console.log(config);
//Connecting to mongodb
mongoose.connect(config.mongodb.host, config.mongodb.db);
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

// Seed a user

var User = mongoose.model('User', userSchema);
var users_list = [
{ username: 'doron', email: 'doron@doron.com', password: 'doron' },
{ username: 'amir', email: 'amir@amir.com', password: 'amir' }
];

for (var i=0; i< users_list.length; i++) {
  var tmp_user = new User(users_list[i]);
  tmp_user.save(function(err, result) {
    if(err) {
        console.log(err);
        return;
    } else if (result) {
      console.log("user: saved.", result);

      if (i == users_list.length) {
        console.log('Complete.');
        mongoose.connection.close();
        process.exit();
      }
    }

  });
}
