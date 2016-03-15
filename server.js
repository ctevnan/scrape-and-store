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

app.get('/', function (req, res) {
  res.send(index.html);
});

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

//db config //working!
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

//lets see if I can get a fake user working  //Batman working!
var practiceUser = new User({
  name: "Bruce Wayne"
});
practiceUser.save(function (err, doc) {
  if (err) {
    console.log(err);
  } else {
    console.log(doc);  
  }
});

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
  });
});

User
  .find([]) //returns users
  .populate('notes')
  .exec(function (err, dbUser) {
    if (err) return handleError(err);
    console.log('The creator %s');
    //prints "The creator is Carolyn"
  });
});

//server connection 
app.listen(PORT, function() {
  console.log("Listening on:" + PORT);
}); 