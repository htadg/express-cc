var assert = require('assert');

var User = require('../models/user');
var Student = require('../models/student');

var addUser = function(req, res){
  if(!req.body.enrollment || !req.body.password)
    return res.status(400).json({success: false, msg: "Invalid Credentials."});
  else{
    if(req.body.enrollment.length != 11){
      return res.status(400).json({success: false, msg: "Invalid Credentials."});
    }
    User.find({"enrollment": req.body.enrollment}, function(err, users){
      if(err) return res.status(400).json({success: false, msg: "Invalid Credentials."});
      if(users.length != 0)
        return res.status(400).json({success: false, msg: "Invalid Credentials."});
      else{
        var user = new User({
          enrollment: req.body.enrollment,
          password: req.body.password,
          admin: req.body.admin || true
        });
        user.save(function(err){
          if(err){
            return res.status(500).json({success: false, msg: "Unable to create User."});
          }
        });
        var student = new Student({
          enrollment: req.body.enrollment,
          name: req.body.name,
          dob: Date.parse(req.body.dob),
          course: req.body.course,
          semester: req.body.semester
        });
        student.save(function(err){
          if(err){
            res.status(500).json({success: false, msg: "Unable to create User."});
          }
          else
            res.status(200).json({success: true, msg: "New User Created."});
        });
      }
    });
  }
};

module.exports = addUser;
