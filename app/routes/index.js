const fooRoutes = require('./foo_routes');

module.exports = function(app, db) {
  fooRoutes(app, db);
};
