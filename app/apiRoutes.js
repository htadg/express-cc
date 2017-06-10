var express = require('express');

var addUser = require('./routes/addUser');
var getUsers = require('./routes/getUsers');
var router = express.Router();

router.use(function(req, res, next){
  try{
    req.body = JSON.parse(Object.keys(req.body)[0]);
  }catch(err){
    req.body = req.body;
  }
  next();
});


router.post('/addUser', addUser);
router.post('/getUsers', getUsers);


module.exports = router;
