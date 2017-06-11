var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Student = require('../models/student');

var authenticate = function(req, res){
  User.findOne({"enrollment": req.body.enrollment}, function(err, user){
    if(err) res.json({"success": false, msg: "Something Crashed"});
    else{
      if(!user) res.json({"success": false, msg: "Authentication failed"});
      else{
        user.comparePassword(req.body.password, function(err, isMatch){
          if(err) res.json({"success": false, msg: "Authentication failed"});
          else{
            Student.findOne({"enrollment": req.body.enrollment}, function(err, student){
              if(err) res.json({"success": false, msg: "Something Crashed"});
              else{
                if(!student) res.json({"success": false, msg: "Student not found"});
                else{
                  var token = jwt.sign(student, process.env.TOKEN_KEY, {
                    expiresIn: 60*60*24*7
                  });
                  res.json({
                    success: true,
                    msg: "Authenticated. Token valid till 7 days",
                    token: token
                  });
                }
              }
            });
          }
        })
      }
    }
  });
};

module.exports = authenticate;
