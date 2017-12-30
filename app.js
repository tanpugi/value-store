/**
 ** Application Initializer
 ** author: https://github.com/tanpugi/
*/
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

global.app = {};
global.app.rootDir = __dirname;

var Promise = require("bluebird");
var express = require('express');
var logger = require("./utils/logutil");

var configLogging = require('./config/logging');
var configMongodb = require('./config/mongodb');
var configRoute = require('./config/route');

const app = express();

logger.info("**************** Value Store API["+process.env.NODE_ENV+"] ******************")
const appConfigs = [];
appConfigs.push(configLogging(app));
appConfigs.push(configMongodb(app));
appConfigs.push(configRoute(app, [
    { pattern: "/",       route: require('./routes/indexRoute') },
    { pattern: "/object", route: require('./routes/keyvalRoute') }
  ])
);

Promise.all(appConfigs)
  .then(function(v) {
    logger.info("Successful app launch.");
    app.locals.ready = true;
  })
  .catch(function(err) {
    logger.error("App has some failed configuration. "+err);
  });

module.exports = app;
