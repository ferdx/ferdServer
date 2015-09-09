var express = require('express');
var app = express();
var mongoose = require('mongoose');
var whitelist = require('./config/helpers'); // used to bootstrap closure

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
