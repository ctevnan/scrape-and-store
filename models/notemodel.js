var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
   notes: {
    type:Array,
    unique:true
   }
});

var Notes = mongoose.model('Notes', noteSchema);
module.exports = Notes;