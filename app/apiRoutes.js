var express = require('express');
var jwt = require('jsonwebtoken');

var addUser = require('./routes/addUser');
var getUsers = require('./routes/getUsers');
var authenticate = require('./routes/authenticate');
var router = express.Router();

router.use(function(req, res, next){
  try{
    req.body = JSON.parse(Object.keys(req.body)[0]);
  }catch(err){
    req.body = req.body;
  }
  next();
});

router.use(/\/((?!(addUser)|(authenticate)).)*/, function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, process.env.TOKEN_KEY, function(err, decoded){
      if(err) req.decoded = false;
      else req.decoded = decoded._doc;
      next();
    })
  }
  else{
    res.status(400).json({success: false, msg: "Unauthorized Access"});
  }
});


router.post('/authenticate', authenticate);
router.post('/addUser', addUser);
router.get('/getUsers', getUsers);


module.exports = router;
