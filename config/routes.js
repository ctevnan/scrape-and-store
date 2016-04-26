var express = require('express');
var router = express.Router();
var scrape = require('../scripts/scrape.js');
var headlinesController = require('../controllers/headlinesController.js');
var notesController = require('../controllers/notes.js');

//use callback to return json data 
router.get('/', function (req, res) {
  res.render('home');
});

//route to test scrape
router.get('/test', function (req, res) {
  scrape("http://www.cnn.com", function (data) {
    res.json(data);
  });
});

//get web scrape
router.post('/fetch', function (req, res) {
  headlinesController.check(function(data) {
    res.json(data);
  });
});

