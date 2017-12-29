var appProps = require("../app-properties.json");
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
  mongoose.Promise = require('bluebird');
  mongoose
    .connect(urifn(), {
      useMongoClient: true,
      autoIndex: false
    })
    .then(function(db) {
      logger.info("Successfully connected to mongodb.");
    });
}

module.exports = mongodbConfig;
