/**
 ** Access related logging configurations
 ** author: https://github.com/tanpugi/  
*/
var appProps = require("../app-properties");
var Promise = require("bluebird");
var morgan = require('morgan');
var uuid = require('node-uuid');
var fs = require('fs');
var path = require('path');
var rfs = require('rotating-file-stream');
var logger = require("../utils/logutil");

morgan.token('id', function getId (req) {
  return req.id
});

function reqAssignId(req, res, next) {
  req.id = uuid.v4();
  next();
};

var logProps = appProps.logging;
var logDirectory = path.join(logProps.outputDir || global.app.rootDir, 'log');

var loggingConfig = function(app) {
  let _this = this;
  return new Promise(function(resolve, reject){
    // create a rotating write stream
    var accessLogStream = rfs('access.log', {
      interval: '1d', // rotate daily
      path: logDirectory
    });

    // setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));
    app.use(morgan(':date[iso](:response-time) :id :status :method :url'));
    app.use(reqAssignId);

    logger.info("Successfully configured logging.");
    resolve(app);
  });
};

module.exports = loggingConfig;
