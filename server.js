// npm packages
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var logger = require('morgan');
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

app.get('/note', function (req, res) {
  Note.find
});

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

//set up handlebars layout
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//db config
mongoose.connect('mongodb://localhost/scrapeddataapp');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful!');
});

//req schemas
var Note = require('./models/notemodel.js');
var User = require('./models/usermodel.js');  


//server connection 
app.listen(PORT, function() {
  console.log("Listening on:" + PORT);
}); 