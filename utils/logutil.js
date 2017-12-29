var appProps = require("../app-properties.json");
var winston = require('winston');
var path = require('path');

winston.emitErrs = true;

var logProps = appProps.logging;
var logDirectory = path.join(logProps.outputDir || global.app.rootDir, 'log');

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: logDirectory + '/app.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
