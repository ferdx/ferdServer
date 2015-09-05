var Ferd = require('./ferd');
var User = require('../api/users/userModel');
var Config = require('./config');

/**
 * MegaFerd. Controller of ferds/
 */
var MegaFerd = function() {
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
    console.log('Ferd for this user exists');
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
  var username = config.username();
  var ferd = new Ferd(ferdConfig);
  this.ferds[username] = ferd;
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
  var oldModules = ferd.getHandlers()
  var newModules = config.whitelistedBotModules();
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
  ferd.disconnect();
  ferd.setToken(config.botKey());
  ferd.login();
};

/**
 * How do you kill ferd?
 */
MegaFerd.prototype.killFerd = function() {

};

module.exports = new MegaFerd();
