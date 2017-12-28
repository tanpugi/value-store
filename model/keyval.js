var mongoose = require('mongoose');
var keyValSchema = new mongoose.Schema({
  key: String,
  value: String,
  timestamp: Number
});

keyValSchema.statics.findByKey =
  function(key, filter, successfn, errorfn) {
    let query = this.findOne({key: key});
    if (filter && filter.timestamp) {
        query = this.findOne({key: key, timestamp: {$lte: timestamp}});
    }

    query.sort('-timestamp');
    query.exec(function (err, keyval) {
        if (err) {
          errorfn(err);
        } else {
          successfn(keyval);
        }
      });
  }

keyValSchema.statics.createNew =
  function(keyValModel, successfn, errorfn) {
    this.create(keyValModel,
    function (err, keyval) {
        if (err) {
          errorfn(err);
        } else {
          successfn(keyval);
        }
    });
  }

module.exports = mongoose.model('KeyVal', keyValSchema);
