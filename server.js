// use require to load http module
//and store returned http instance into http variable

// npm packages

var http = require("http");
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var request = require('request');
var app = express();
var PORT = process.env.PORT || 8080;

http.createServer(function (request, response) {
  //Send http header
  //http Status: 200 : OK
  //Content Type: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});

  //Send the response body as "Hello World"
  response.end('Hello World\n');
}).listen(8081);

app.use(bodyParser.urlencoded({
  extended: false
}));

//set up handlebars layout
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//database connection
app.listen(PORT, function() {
  console.log("Listening on:" + PORT)
});