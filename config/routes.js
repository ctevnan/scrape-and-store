var express = require('express');
var router = express.Router();
var scrape = require('../scripts/scrape.js');
var headlinesController = require('../controllers/headlinesController.js');
var notesController = require('../controllers/notes.js');

//use callback to return json data from mongo
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
  headlinesController.fetch(); {
  res.send('success');
});

//check mongo for data
router.get('/check', function (req, res) {
  headlinesController.check(function(data) {
    res.json(data);
  });
});

//gather notes from mongo
router.post('/gather', function (req, res) {
  notesController.gather(req.body, function(data) {
    res.json(data);
  });
});

//post to save note into mongo
router.post('/save', function (req, res) {
  notesController.save(req.body, function(data) {
    res.json(data);
  });
});



