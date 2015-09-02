var Profile = require('./db');
var Q = require('q');
var MegaFerd = require('../ferd/megaFerd');

var pack = function (data) {
  return {
    username: data.username,
    slackOrganization: data.slackOrganization,
    conf: {
       botKey: data.botKey,
       botModules: data.botModules
    }
  };
};

var fetch = function (req, res) {
  var findOne = Q.nbind(Profile.findOne, Profile);
  Profile.findOne({username: req.body.username})
    .then(function(data) {
      MegaFerd.process(pack(data), function () {
        res.end(); // callback
      });
    });
};

module.exports = {
  fetch: fetch
};
