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

//rorating cube state
var state = 0;
var cubeRotateAry = ['show-front', 'show-back', 'show-right', 'show-left', 'show-top', 'show-bottom'];
var sideAry = ['back', 'right', 'left', 'top', 'bottom', 'front'];

//ajax get news
var populate = function() {
  //get JSON with jquery AJAX call
  $.getJSON('/check', function(data) {
    mongoData = data;
    dataDate = mongoData[mongoData.length -1].date;
    //for item in json add table row and cells to content string
  }).done(function() {
    //running clickbox funct
    clickBox();
    saveNote();
  });
};

//ajax get note data
var gather = function() {
  var idCount = dataCount - 1;

  //get JSON
  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/gather',
    data: {
      id: mongoData[idCount]._id
    }
  })
  .done(function(currentNotes) {
    postNote(currentNotes);
  })
  .fail(function() {
    console.log("Apologies. Server unavailable.");
  });
};

//render notes from data
var postNote = function(currentNotes) {
  $("note-box").val("");

  var note = "";
  for (var i = 0; i < currentNotes.length; i++) {
    note = note + currentNotes[i].noteText + '\n';
  }

  $("#note-box").val(note);
};

//function with listener to save notes and clear note taking area
var saveNote = function() {
  $("#note-button").on('click', function() {
    var text = $("#input-box").val();
    var idCount = dataCount - 1;

    $.ajax({
      type: "POST",
      dataType: "json",
      url: '/save',
      data: {
        id: mongoData[idCount]._id,
        date: dataDate,
        note: text
      }
    })
    .done(function() {
      $("#input-box").val("");
      //get notes again bc new note saved
      gather();
    })
    .fail(function() {
      console.log("Apologies. Server down");
    });
  });
};

//function with listener to delete notes      
var deleteNote = function() {
  $("#delete-button").on('click', function() {
    var idCount = dataCount - 1;

    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: '/delete',
      data: {
        id: mongoData[idCount]._id,
      }
    })
    .done(function() {
      $("#note-box").val("");
    })
    .fail(function() {
      console.log("Apologies. Server down");
    });

  });
};
