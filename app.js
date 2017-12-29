global.app = {};
global.app.rootDir = __dirname;

var express = require('express');
var logger = require("./utils/logutil");

var configLogging = require('./config/logging');
var configMongodb = require('./config/mongodb');
var configRoute = require('./config/route');

const app = express();

configLogging(app);
configMongodb(app);
configRoute(app, [
  { pattern: "/",       route: require('./routes/indexRoute') },
  { pattern: "/object", route: require('./routes/keyvalRoute') }
]);

module.exports = app;
