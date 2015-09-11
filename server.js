var express = require('express');
var app = express();
var mongoose = require('mongoose');
var ModuleLoader = require('./ferd/moduleLoader').load(); // used to bootstrap ModuleLoader
var MegaFerd = require('./ferd/megaFerd'); // used to bootstrap MegaFerd

// connect to mongo
var cred = process.env.MONGOLAB_CRED;
var dbhost = process.env.MONGOLAB_HOST;
var dbport = process.env.MONGOLAB_PORT;
var dbname = process.env.MONGOLAB_DBNAME;
var dburi = 'mongodb://' + cred + '@' + dbhost + ':' + dbport + '/' + dbname;

mongoose.connect(dburi);

// configure our server with all the middleware
require('./config/middleware.js')(app, express);

// set port
app.set('port', (process.env.PORT || 3000));

// listen
app.listen(app.get('port'));

// export our app for testing and flexibility
module.exports = app;
