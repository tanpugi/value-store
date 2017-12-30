/**
 ** KeyValue MongoDB Model
 ** author: https://github.com/tanpugi/
*/
var mongoose = require('mongoose');
var Promise = require("bluebird");

var keyValSchema = new mongoose.Schema({
  key: String,
  value: String,
  timestamp: Number
});

keyValSchema.statics.findByKey =
  function(key, filter) {
    let _this = this;
    return new Promise(function(resolve, reject){
      let query = _this.findOne({key: key});
      if (filter && filter.timestamp) {
        query = _this.findOne({key: key, timestamp: {$lte: filter.timestamp}});
      }

      query.sort('-timestamp');
      query.exec(function (err, keyval) {
        if (err) {
          reject(err);
        } else {
          resolve(keyval);
        }
      });
    });
  }

keyValSchema.statics.createNew =
  function(keyValModel) {
    let _this = this;
    return new Promise(function(resolve, reject){
      _this.create(keyValModel,
        function (err, keyval) {
          if (err) {
            reject(err);
          } else {
            resolve(keyval);
          }
        });
      });
  }

module.exports = mongoose.model('KeyVal', keyValSchema);
