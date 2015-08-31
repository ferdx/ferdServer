var Ferd = require('./Ferd');
var secrets = require('./secrets.js');

var MegaFerd = function() {
  this.ferds = [];
  for(var i = 0; i < secrets.slackAPIKeys.length; i++) {
    // console.log(secrets.slackAPIKeys[i]);
    this.ferds.push(new Ferd(secrets.slackAPIKeys[i]));
  }
};

module.exports = MegaFerd;
