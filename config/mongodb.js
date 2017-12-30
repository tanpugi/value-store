/**
 ** MongoDB related logging configurations
 ** author: https://github.com/tanpugi/
*/
var appProps = require("../app-properties");
var Promise = require("bluebird");
var mongoose = require('mongoose');
var logger = require("../utils/logutil");

function urifn() {
  var props = appProps.mongodb;
  var propsClusterLen = props.clusters.length;
  var uri = '';
  uri += "mongodb://"+props.username+":"+props.password+"@";
  for (var i=0; i<propsClusterLen; i++) {
    uri += props.clusters[i];
    if (i<(propsClusterLen-1)) {
      uri+=",";
    }
  }
  uri+="/"+props.db+"?ssl=true&replicaSet="+props.replicaSet+'&authSource='+props.authSource;
  return uri;
};

var mongodbConfig = function(app) {
  let _this = this;
  return new Promise(function(resolve, reject){
    // mongoose promise is deprecated. need to add supplied one.
    mongoose.Promise = Promise;
    mongoose
      .connect(urifn(), {
        useMongoClient: true,
        autoIndex: false
      })
      .then(function(db) {
        logger.info("Successfully connected to mongodb.");
        resolve(app);
      })
      .catch(function(err) {
        logger.error("Failed to connect to mongodb. /n" + err);
        reject(err);
      });
  });
}

module.exports = mongodbConfig;
