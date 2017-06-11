var User = require('../models/user');
var Student = require('../models/student');

var getUsers = function(req, res){
  if(req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
  var ern = req.decoded.enrollment;
  User.findOne({"enrollment": ern}, function(err, user){
    if(err) return res.status(400).json({success: false, msg: "Unauthorized Access"});
    else{
      if(user.length == 0) return res.status(400).json({success: false, msg: "Unauthorized Access"});
      Student.find({}, function(err, users){
        if(err) res.status(500).json({success: false, msg: "Something Crashed"});
        else{
          if(users.length === 0) res.status(200).json({success: false, msg: "No User to return."});
          else{
            res.status(200).json(users);
          }
        }
      });
    }
  });
};

module.exports = getUsers;
