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

/**
 * Returns the intersection of whitelist and list
 * @param  {Array[String]} list
 * @return {Array[String]}
 */
var whitelistify = function(list) {
  return whitelist.filter(function(n) {
      return list.indexOf(n) != -1
  });
};

module.exports = {
  whitelist: whitelist,
  whitelistify: whitelistify
};
