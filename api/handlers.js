var db = require('./db');
var handlers = {};

handlers.pack = function (data) {
  var payload = {
    username: data.username,
    password: data.password,
    slackOrganization: data.slackOrganization,
    conf: {
       botKey: data.botKey,
       botModules: data.botModules
    }
  };
  // pass the updates to MegaFerd
  MegaFerd.process(payload, function () {
    res.end(); // callback
  });
};

handlers.fetch = function (req, res) {
  // interrogate the database and get a promise
  db.findOne(req.body.objectId)
    .then(this.pack.bind(this)); 
};

module.exports = handlers;
