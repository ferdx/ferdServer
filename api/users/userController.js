var User = require('./userModel');
var Q = require('q');
var MegaFerd = require('../../ferd/megaFerd');

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



module.exports = {
  update: function (req, res) {
    console.log("updating");
    var findOne = Q.nbind(User.findOne, User);
    User.findOne({username: req.body.username})
      .then(function(data) {
        MegaFerd.process(pack(data), function () {
          res.end();
        });
      });
  }
};
