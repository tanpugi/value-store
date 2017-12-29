var appProps = require("../app-properties.json");
var bodyParser = require('body-parser');
var logger = require("../utils/logutil");

function reqNotFound(req, res, next) {
  var err = new Error('not found');
  err.status = 404;
  next(err);
};
function reqErrorHandler(err, req, res, next) {
  res.status(err.status || 500);
  var isDev = req.app.get('env') === 'development';
  if (isDev) {
    res.locals.errorMessage = err.message;
    res.locals.errorStack = err;
  } else if (res.status < 500){
    res.locals.errorMessage = err.message;
    res.locals.errorStack = {};
  } else {
    res.locals.errorMessage = 'there is something wrong with the server';
    res.locals.errorStack = {};
  }

  res.json({
    'error': {
      status: res.status,
      msg: res.locals.errorMessage,
      errorStack: res.locals.errorStack
    }
  });
};

var routeConfig = function(app, routes) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  if (routes && routes.length > 0) {
    for (var i=0; i < routes.length; i++) {
      app.use(routes[i].pattern, routes[i].route);
    }
  }

  app.use(reqNotFound);
  app.use(reqErrorHandler);

  logger.info("Successfully configured routes.");
}

module.exports = routeConfig;
