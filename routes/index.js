var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  console.log("we are here");
  res.send('home');  
});
    

module.exports = router;