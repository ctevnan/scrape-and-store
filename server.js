// npm packages
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var logger = require('morgan');
var mongoose = require('mongoose');  //orm 
var request = require('request');
var path = require('path');
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

//db.on('error', function (err) {
//  console.log('Mongoose Error: ', err);
//});
//db.once('open', function() {
//  console.log('Mongoose connection successful!');
//});

request('http://www.cnn.com', function(error, response, body) {
  //hand html response to cheerio
  //assign that to a local $ var to provide familiar jQuery syntax
  var $ = cheerio.load('<h2 class="title">Title</h2>');

  $('h2.title').text('Welcome to The Daily News Brief featuring CNN.com');
  $('h2').addClass('Welcome');

  $.html();
  //console.log('h2' + $);

  //same code used in browser
  $('h2').each(function() {
    console.log($(this).text());
  });
});  

//routes
var routes = require('./routes/index');
app.use('/', routes);

app.get('/', function (req, res) {
  res.send(index.html);
});

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false
}));

//req schemas
var Note = require('./models/notemodel.js');
var User = require('./models/usermodel.js');  

//lets see if I can get a fake user working  //Batman working!
var practiceUser = new User({
  name: "Bruce Wayne"
});

//practiceUser.save(function (err, doc) {
//  if (err) {
//    console.log(err);
//  } else {
//    console.log(doc);  
//  }
//});

//making a new note
app.post('/submit', function (req, res) {
  var newNote = new Note (req.body);

//saving note
  newNote.save(function (err, doc) {
    if (err) {
      res.send(err);
    } else {

//find user, push note id into the user's note array
      User.findOneAndUpdate({}, {$push: {'notes': doc._id}}, {new: true}, function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.send(doc);
        }
      });      
    }
  });  
});

//route to notes
app.get('/notes', function (req, res) {
  Note.find({}, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

//route to see user w/o populating
app.get('/user', function (req, res) {
  User.find({}, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

//route to see user w/populating
app.get('/populateduser', function (req, res) {
  populateduser.find({}, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  })
});

//server connection 
app.listen(PORT, function() {
  console.log("Listening on:" + PORT);
}); 