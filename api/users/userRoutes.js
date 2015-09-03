var userController = require('./userController.js');

module.exports = function(app) {
  app.post('/update', userController.update);
};
