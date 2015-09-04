var fs = require('fs');
var path = require('path');
var whitelist;

/**
 * Bootstraps whitelist the first time closure is instantiated in server.js
 */
var bootstrapWhitelist = function() {
  var scriptPath = path.resolve(".", "package.json");
  var data = fs.readFileSync(scriptPath);
  whitelist = JSON.parse(data).ferd_modules;
}();

module.exports = {
  whitelist: whitelist
};
