$(document).ready(function() {
  $('.container').hide();
  //get data
  fetchData();

  //hide
  $("#seek-box").hide();
  $("#input-area").hide();
  $("#saved-text").hide();
  $("#saved-area").hide();
  $("#seek-box").click(function() {
    //put data in html
    populate();
    $('.container').show();
    $("#seek-box").hide();
  });
});

//data goes here
var mongoData;
var dataCount = 0;
var dataDate;

    
  }