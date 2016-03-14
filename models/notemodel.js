var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  title: {
    type:String
  },
  body: {
    type:String
  },
  _articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }
});

var Note = mongoose.model('Note', noteSchema);
module.exports = Note;