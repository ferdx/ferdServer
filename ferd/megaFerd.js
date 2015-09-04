var Ferd = require('./ferd');
var User = require('../api/users/userModel');
var Config = require('./config');
var helper = require('../config/helpers');

/**
 * MegaFerd. Controller of ferds/
 */
var MegaFerd = function() {
  console.log(helper.whitelist);
  // stores ferds with keys being their api tokens.
  User.find({}, function(err, docs) {
    docs.forEach(function(doc) {
      this.process(doc);
    }, this);
  }.bind(this));
  this.ferds = {};
};

/**
 * Takes in a configuration json and decides what to do with it.
 * If new BotKey, creates new Ferd object
 * Else, update existing Ferd
 * @param  {JSON} json See secrets.js
 * @param {Function} callback
 */
MegaFerd.prototype.process = function(json, callback) {
  callback = callback || function(){};
  var config = new Config(json);
  if(this.hasFerd(config)) {
    this.updateFerd(config);
    console.log('Ferd for this key exists');
  } else {
    this.createFerd(config);
  }
  callback();
};

/**
 * Creates Ferd with config
 * @param  {Config} config
 */
MegaFerd.prototype.createFerd = function(config) {
  var ferdConfig = config.ferdConfig();
  var botKey = config.botKey();
  var ferd = new Ferd(ferdConfig);
  this.ferds[botKey] = ferd;
};

/**
 * Checks if a ferd object with apiKey exists
 * @param  {Config}  config
 * @return {Boolean}
 */
MegaFerd.prototype.hasFerd = function(config) {
  var botKey = config.botKey();
  return !!this.ferds[botKey];
};

/**
 * Update Ferd with new config
 * @param  {Config}  config
 */
MegaFerd.prototype.updateFerd = function(config) {
  var botKey = config.botKey();
  var ferd = this.ferds[botKey];
  var oldModules = ferd.getHandlers()
  var newModules = config.botModules();
  // intersection
  newModules = helpers.whitelist.filter(function(n) {
      return oldModules.indexOf(n) != -1
  });
  var subtract = oldModules.filter(function (a) {
        return newModules.indexOf(a) == -1;
  });
  var add = newModules.filter(function (a) {
        return oldModules.indexOf(a) == -1;
  });
  oldModules.forEach(function(moduleName) {
    ferd.removeHandler(moduleName);
  });
  newModules.forEach(function(moduleName) {
    ferd.addHandler(moduleName);
  });
};

/**
 * How do you kill ferd?
 */
MegaFerd.prototype.killFerd = function() {

};

module.exports = new MegaFerd();
