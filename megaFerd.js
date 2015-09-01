var Ferd = require('./ferd');
var Config = require('./config');

/**
 * MegaFerd. Controller of ferds/
 */
var MegaFerd = function() {
  //
  this.ferds = {};
};

/**
 * Takes in a configuration json and decides what to do with it.
 * If new BotKey, creates new Ferd object
 * Else, nothing.
 * @param  {JSON} json See secrets.js
 * @param {Function} callback
 */
MegaFerd.prototype.process = function(json, callback) {
  callback = callback || function(){};
  var config = new Config(json);
  if(this.hasFerd(config)) {
    console.log('Ferd for this key exists');
  } else {
    this.createFerd(config);
  }
  callback();
};

/**
 * Creates Ferd with config
 * @param  {Config} config [description]
 * @return {[type]}        [description]
 */
MegaFerd.prototype.createFerd = function(config) {
  var ferdConfig = config.ferdConfig();
  var botKey = config.botKey();
  var ferd = new Ferd(ferdConfig);
  this.ferds[botKey] = ferd;
};

/**
 * Checks if a ferd object with apiKey exists
 * @param  {Config}  config [description]
 * @return {Boolean}
 */
MegaFerd.prototype.hasFerd = function(config) {
  var botKey = config.botKey();
  return !!this.ferds[botKey];
};

/**
 * How do you kill ferd?
 */
MegaFerd.prototype.killFerd = function() {

}

module.exports = MegaFerd;
