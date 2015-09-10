var Ferd = require('ferd');
var User = require('../api/users/userModel');
var Config = require('./config');
var ModuleLoader = require('./moduleLoader');

/**
 * MegaFerd. Controller of ferds/
 */
var MegaFerd = function() {
  // stores ferds with keys being their api tokens.
  this.ferds = {};
  this.moduleLoader = ModuleLoader;
  User.find({}, function(err, docs) {
    docs.forEach(function(doc) {
      this.process(doc);
    }, this);
  }.bind(this));
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
  if (config.botKey()) {
    var username = config.username();
    var ferd = this.ferds[username] = new Ferd(config.botKey());
    ferd.login();
    ferd.addModules(this.moduleLoader.getModules(config.botModules()));
  }
};

/**
 * Checks if a ferd object with apiKey exists
 * @param  {Config}  config
 * @return {Boolean}
 */
MegaFerd.prototype.hasFerd = function(config) {
  var username = config.username();
  return !!this.ferds[username];
};

/**
 * Update Ferd with new config
 * @param  {Config}  config
 */
MegaFerd.prototype.updateFerd = function(config) {
  var username = config.username();
  var ferd = this.ferds[username];
  try {
    ferd.logout(); // hope this destroys ferd and all its observers
  } catch(e) {
    console.error("Cannot Logout Ferd", e);
  }
  this.createFerd(config);
};

module.exports = new MegaFerd();
