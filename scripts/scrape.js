var request = require("request");
var cheerio = require("cheerio");

//scrape cnn
var scrape = function(url, cb) {
  if (url == "http://www.cnn.com") {
    request(url, function (err, res, body) {
      var $ = cheerio.load(body);
      var obj = {};

      $(".theme-summary").each(function (i, element){
        //articles grouped by class theme-summary
        //use jQuery .children() to find headings, summaries
        var head =$("this").children(".story-heading").text();
        var sum = $("this").children(".summary").text();

        if (head !== "" && sum !== ""){
          //filter data, trim
          var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          obj[i] = [headNeat]; //init array with headneat 
          obj[i].push(sumNeat);
        }
      });
      console.log(obj); //for testing

      cb(obj);
    });
  }
};

module.exports = scrape;