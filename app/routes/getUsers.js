var User = require('../models/user');

var getUsers = function(req, res){
  User.find({}, function(err, users){
    if(err) res.status(500).json({success: false, msg: "Something Crashed"});
    else{
      if(users.length === 0) res.status(200).json({success: false, msg: "No User to return."});
      else{
        res.status(200).json(users);
      }
    }
  });
};

module.exports = getUsers;
