var bluebird = require('bluebird');
var mongo = require('mongodb'); // or sql

var db = {};


db.find = function (query) {

  return new Promise(function (resolve, reject) {
    // query the database

    if (err) {
      reject(err);
    } else {
      resolve(data);
    }

  });

};


module.exports = db;