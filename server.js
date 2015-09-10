var express = require('express');
var app = express();
var mongoose = require('mongoose');
var ModuleLoader = require('./ferd/moduleLoader').load(); // used to bootstrap ModuleLoader
var MegaFerd = require('./ferd/megaFerd'); // used to bootstrap MegaFerd

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
