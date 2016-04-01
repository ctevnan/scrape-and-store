var express = require('express');
var router = express.Router();
var scrape = require('../scripts/scrape.js');
var headlinesController = require('../controllers/headlinesController.js');
var notesController = require('../controllers/notes.js');

router.get('/', function (req, res) {
  res.render('home');
});

