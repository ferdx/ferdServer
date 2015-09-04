var User = require('./userModel');
var Q = require('q');
var MegaFerd = require('../../ferd/megaFerd');
var helpers = require('../../config/helpers');

var pack = function (data) {
  return {
    username: data.username,
    slackOrganization: data.slackOrganization,
    botKey: data.botKey,
    botModules: data.botModules
  };
};



module.exports = {
  update: function(req, res) {
    var findOne = Q.nbind(User.findOne, User);
    User.findOne({username: req.body.username})
      .then(function(data) {
        MegaFerd.process(pack(data), function () {
          res.end();
        });
      });
  },
  modules: function(req, res) {
    res.send({modules: helpers.whitelist});
  }
};
