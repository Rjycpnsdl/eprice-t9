var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var itemSchema = new Schema({
  // id is created automatically
  product: String,
  price: String,
  shop: String,
  description: String,
  image: String,
  // dateCreated: [{
  //   postedDate: {
  //     type: Date,
  //     'default': Date.now
  //   },
  //   isDate: String
  // }]
});

itemSchema.plugin(timestamps);

module.exports = mongoose.model('Item', itemSchema);