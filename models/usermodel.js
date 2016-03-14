var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type:String,
    unique:true
  }
});

var User = mongoose.model('User', userSchema);
module.exports = User;