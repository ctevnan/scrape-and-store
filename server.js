// npm packages
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');  //orm 
var request = require('request');
var app = express();
var PORT = process.env.PORT || 8080;

request('http://www.cnn.com', function(error, response, body) {
  //hand html response to cheerio
  //assign that to a local $ var to provide familiar jQuery syntax
  var $ = cheerio.load(body);
  console.log($);

  //same code used in browser
  $('h2').each(function() {
    console.log($(this).text());
  });
});  

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