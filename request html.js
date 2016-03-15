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




//request('http://www.cnn.com', function(error, reponse, body){
//  var $ = cheerio.load(body);

//  $('.cd__heline-text').each(function(){
    // console.log($(this).text())
//    console.log('found a title')
//  })
//})

