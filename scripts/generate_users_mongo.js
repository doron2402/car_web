var mongodbObj = require('../lib/mongodb');
var config = require('../settings/config.json');

if (process.env.ENV) {
  config = config[process.env.ENV];
} else {
  config = config.dev;
}
console.log('Generate users...');


var User = = mongodbObj.userModel;

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
        process.exit();
      }
    }

  });
}
