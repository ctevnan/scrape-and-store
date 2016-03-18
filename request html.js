//var request = require('request');
//request('http://www.cnn.com', function (error, response, body) {
//  if (!error && response.statusCode == 200) {
//    console.log(body)  //show html for cnn.com
//  }
//})
request
.get('http://www.cnn.com/home')
.on('response', function (response) {
  console.log(response.statusCode) //200
  console.log(response.headers['content-type']) //homepage
})
.pipe(request.put('./home'))


User
   .find([]) //returns users
   .populate('notes')
   .exec(function (err, dbUser) {
    if (err) return handleError(err);
       console.log(err);
  //     console.log('The creator is %s', PORT);
  //     console.log('The creator is ' + PORT);

  //     //prints "The creator is port 8080"
  // });
});


request
.get('http://www.cnn.com')
.on('response', function (error, reponse, body){
  var $ = cheerio.load(body);

  $('.cd__heline-text').each(function(){
     console.log($(this).text())
     console.log('found a title')
  })
});