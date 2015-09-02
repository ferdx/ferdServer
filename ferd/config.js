/**
 * Thin wrapper aroung configuration file. Used in the case config schema changes.
 * @param {JSON} config [description]
 */
var Config = function(config) {
  this.config = config;
};
/**
 * Returns botKey
 * @return {String}
 */
Config.prototype.botKey = function() {
  return this.config.conf.botKey;
};

/**
 * Returns botModules
 * @return {String}
 */
Config.prototype.botModules = function() {
  return this.config.conf.botModules;
};

/**
 * Get a ferd configuration option used to instatiate a new Ferd object
 * @return {Object} {ferd_modules: '', apiKey: ''}
 */
Config.prototype.ferdConfig = function() {
  var config = {};
  config['ferd_modules'] = this.config.conf.botModules;
  config['apiKey'] = this.config.conf.botKey;
  return config;
};

module.exports = Config;
