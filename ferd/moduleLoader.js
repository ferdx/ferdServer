var path = require('path');
var fs = require('fs');

var ModuleLoader = function() {
  this.modules = {};
  this.moduleJson = {};
};

/**
 * Loads all the modules in a folder on a relative path for ModuleLoader to use
 */
ModuleLoader.prototype.load = function() {
  var self = this;
  var moduleJsonPath = path.resolve(".", "modules.json");
  var ferdModulesFolderPath = path.resolve(".", './ferd_modules')
  this.moduleJson = JSON.parse(fs.readFileSync(moduleJsonPath));

  this.moduleJson.modules.forEach(function(moduleSchema) {
    if(moduleSchema.npm) {
      self.modules[moduleSchema.name] = require(moduleSchema.name);
    } else {
      self.modules[moduleSchema.name] = require(ferdModulesFolderPath + '/' + moduleSchema.name + '.js');
    }
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

ModuleLoader.prototype.getModuleData = function() {
  return this.moduleJson;
};

module.exports = new ModuleLoader();
