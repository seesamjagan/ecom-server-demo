var express = require('express');
var router = express.Router();

let users = ["jagan", "langa", "hope", "samy"];

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.json({status: true, data: users})
});

router.post("/login", function (req, res, next) {
  let userName = req.body.userName;
  if(!userName) {
    res.json({status: false, message: "userName is missing"});
  } else if(!users.find(function(user){return user.toLowerCase() === userName.toLowerCase()})) {
    res.json({status: false, message: "unauthorized user"});
  } else {
    res.json({status: true, data: userName});
  }
});

module.exports = router;
