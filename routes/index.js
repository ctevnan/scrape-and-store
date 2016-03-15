var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  console.log("we are here");
  console.log(process.cwd());
  res.sendFile(process.cwd() +'/public/index.html');  
});

module.exports = router;