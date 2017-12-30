/**
 ** Test Application Initializer
 ** author: https://github.com/tanpugi/
*/
process.env.NODE_ENV = "test";

var Promise = require("bluebird");
var app = require('./app');
var appProps = require("./app-properties");
var logger = require("./utils/logutil");

const serverProps = appProps.server;
const port = serverProps.port;
app.set('port', port);

let apptest = function(callback) {
  let _this = this;
  return new Promise(function(resolve, reject){
    let appIntervalCount = 0;
    const appInterval = setInterval(function() {
      if (app.locals.ready) {
        logger.info("Started test server. Listening to port "+port);
        app.listen(port, callback);
        resolve(app);
        clearInterval(appInterval);
      } else {
        appIntervalCount++;
      }
    }, 1000);
  });
}

module.exports = apptest;
