var Promise = require('bluebird');
var mongoose = require('mongoose');

// set the mongo host to refer to env variables
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Successfully connected to MongoDB server.");
});

var profileSchema = mongoose.Schema({
  username: String,
  password: String,
  slackOrganization: String,
  conf: {
     botKey: String,
     botModules: Array
  }
});

profileSchema.methods.findOne = function (objectId) {
  var model = this;
  return new Promise(function (resolve, reject) {
    model.find({ 
        objectId: objectId
      }, 
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });

};

var Profile = mongoose.model('Profile', profileSchema);

module.exports = new Profile();