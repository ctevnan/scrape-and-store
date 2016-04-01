// npm packages
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var logger = require('morgan');
var mongoose = require('mongoose');  //orm 
var request = require('request');
var app = express();

//mongoose connect
var db = 'mongodb://localhost/scrapeddataapp';
mongoose.connect(db, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log('mongoose connection is successful');
  }
}); 

app.use(express.static(__dirname + '/public'));
var port = 3000;

//set up handlebars layout
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));

//morgan
app.use(logger('dev'));

//routes
var routes = require('./config/routes.js');

app.use('/', routes);
app.use('/test', routes); 
app.use('/fetch', routes);
app.use('/gather', routes);
app.use('/check', routes);
app.use('/save', routes);
app.use('/delete', routes);

//server connection 
app.listen(port, function() {
  console.log("Listening on port:" + port);
}); 