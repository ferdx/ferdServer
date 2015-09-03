// require dotenv for secret stuff
require('dotenv').load();

// other requirements
var express = require('express');
var app = express();
var mongoose = require('mongoose');

// connect to mongo
mongoose.connect('mongodb://localhost/ferdx');

// configure our server with all the middleware
require('./config/middleware.js')(app, express);

// set port
app.set('port', (process.env.PORT || 3000));

// listen
app.listen(app.get('port'));

// export our app for testing and flexibility
module.exports = app;
