var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title could not be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Content could not be blank'
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Article', ArticleSchema);
