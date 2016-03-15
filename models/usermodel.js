var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type:String,
    unique:true
  },
  //takes an array called notes
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]  
});

var User = mongoose.model('User', userSchema);
module.exports = User;