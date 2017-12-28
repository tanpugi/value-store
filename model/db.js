var mongoose = require('mongoose');

var config = {};

config.URL='mongodb://jlonceras:1234@cluster0-shard-00-00-hp1fd.mongodb.net:27017,cluster0-shard-00-01-hp1fd.mongodb.net:27017,cluster0-shard-00-02-hp1fd.mongodb.net:27017/test?ssl=true&replicaSet=cluster0-shard-0&authSource=admin';
mongoose.connect(config.URL, {useMongoClient: true});