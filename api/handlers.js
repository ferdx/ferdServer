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

  // extract identifier from request
  var query = req.body.whatever;

  // interrogate the database
  // use a promise interface in the db module
  db.find({ query: query })
    .then(this.pack); 

};

module.exports = handlers;
