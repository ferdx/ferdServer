var path = require('path');

var ModuleLoader = function() {
  this.modules = {};
};

/**
 * Loads all the modules in a folder on a relative path for ModuleLoader to use
 */
ModuleLoader.prototype.load = function(path) {
  var self = this;

  // Finds absolute path from relative path
  var normalizedPath = require("path").join(__dirname, path);

  // SYNCHRONOUS
  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    var moduleName = file.replace(".js", "");
    self.modules[moduleName] = require(normalizedPath + '/' + moduleName);
  });

};

/**
 * Returns array of modules loaded
 * @return {Array[String]} ['yo', 'bart']
 */
ModuleLoader.prototype.getModules = function(modules) {
  var self = this;
  var moduleArray = Object.keys(self.modules)
    .filter(function (m) { return modules.indexOf(m) !== -1 })
    .map(function(k){ return self.modules[k] });
  return moduleArray;
};



module.exports = ModuleLoader;
