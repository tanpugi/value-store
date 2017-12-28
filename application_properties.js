let config = module.exports = {};

/**
 * Cluster
 */
config.CLUSTER = {};
config.CLUSTER.NUMBER_OF_WORKERS_ALLOWED = 2;
config.CLUSTER.NUMBER_OF_SUDDEN_DEATHS_ALLOWED = 5;

/**
 * HTTP Server
 */
config.HTTP = {};
config.HTTP.PORT = process.env.HTTP_PORT || 3012;
config.HTTP.GLOBALAGENT_MAXSOCKETS = 15;

/**
 * HTTP+SSL Secure Server
 */
config.HTTPS = {};
config.HTTPS.PORT = process.env.HTTPS_PORT || 443;
config.HTTPS.GLOBALAGENT_MAXSOCKETS = 15;
config.HTTPS.OPTIONS = {};
config.HTTPS.OPTIONS.key = null;
config.HTTPS.OPTIONS.cert = null;

/**
 * Logging
 */
config.LOGGING = {};

/**
 * Mongoose
 */
config.MONGOOSE = {};
config.MONGOOSE.CONNECTION = 'mongodb://127.0.0.1:27017/tih';

/**
 * Routes
 */
config.ROUTES = {};
config.ROUTES.CORS = {};
config.ROUTES.CORS.WHITELIST = '*';
