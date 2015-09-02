var mongoose = require('mongoose');

// set the mongo host to refer to env variables
mongoose.connect('mongodb://localhost/ferdx');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Successfully connected to MongoDB server.");
});

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  slackOrganization: String,
  botKey: String,
  botModules: Array
});

// profileSchema.methods.findOne = function (username) {
//   var model = this;
//   return new Promise(function (resolve, reject) {
//     model.findOne({
//         username: username
//       },
//       function (err, data) {
//         if (err || !data) {
//           reject(err || "Not found.");
//         } else {
//           resolve(data);
//         }
//       });
//   });

// };

module.exports = mongoose.model('users', UserSchema);
