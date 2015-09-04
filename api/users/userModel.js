var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  slackOrganization: String,
  botKey: String,
  botModules: Array
});

module.exports = mongoose.model('users', UserSchema);
