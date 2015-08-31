var Ferd = require('./Ferd');
var secrets = require('./secrets.js');

var MegaFerd = function() {
  this.ferds = [];
  for(var i = 0; i < secrets.ferds.length; i++) {
    console.log(secrets.ferds[i]);

    this.ferds.push(new Ferd(secrets.ferds[i]));
  }
};

module.exports = MegaFerd;
