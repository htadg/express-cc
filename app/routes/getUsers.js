var User = require('../models/user');
var Student = require('../models/student');

var getUsers = function(req, res){
  if(req.decoded === false) return res.json({success: false, msg: "Unauthorized Access"});
  var ern = req.decoded.enrollment;
  User.findOne({"enrollment": ern}, function(err, user){
    if(err) return res.json({success: false, msg: "Unauthorized Access"});
    else{
      if(user.length == 0) return res.json({success: false, msg: "Unauthorized Access"});
      Student.find({}, function(err, users){
        if(err) res.json({success: false, msg: "Something Crashed"});
        else{
          if(users.length === 0) res.json({success: false, msg: "No User to return."});
          else{
            res.json(users);
          }
        }
      });
    }
  });
};

module.exports = getUsers;
