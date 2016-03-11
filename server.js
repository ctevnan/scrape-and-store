// npm packages

var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');  //orm thing
var request = require('request');
var app = express();
var PORT = process.env.PORT || 8080;

//routes
var routes = require('./routes/index');
app.use('/', routes);

app.use(bodyParser.urlencoded({
  extended: false
}));

//set up handlebars layout
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//db connection 

app.listen(PORT, function() {
  console.log("Listening on:" + PORT);
});
 