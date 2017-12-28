var mongoose = require('mongoose');
var appProps = require("../app-properties.json");

var urifn = function() {
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
}

mongoose
  .connect(urifn(), {
    useMongoClient: true,
    autoIndex: false
  })
  .then(function(db) {
    console.log("Successfully connected to mongodb.");
  });
