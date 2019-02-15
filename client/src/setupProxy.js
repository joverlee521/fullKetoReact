// Dependencies
const proxy = require('http-proxy-middleware');

// Set up proxy to access server API on localhost
module.exports = function(app) {
  app.use(proxy('/auth', { target: 'http://localhost:8080/' }));
  app.use(proxy('/api', { target: 'http://localhost:8080/' }));
};