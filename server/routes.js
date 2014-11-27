/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var cors = require('cors');

module.exports = function (app) {

  app.all("/api/*", function (req, res, next) {
    res.contentType('application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
  });

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/fitzMuseum', require('./api/fitzMuseum'));
  app.use('/api/wikimedia', require('./api/wikimedia'));
  app.use('/api/brooklynMuseum', require('./api/brooklynMuseum'));
  app.options('/api/brooklynMuseum', cors());

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function (req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
