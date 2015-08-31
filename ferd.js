/**
 * Requirements
 */
var extend = require('extend');
var Promise = require('bluebird');
var request = require('request');
var qs = require('querystring');
var WebSocket = require('ws');

var MessageHandler = require('./messageHandler');

/**
 * Ferd() sets up ferd!
 */
var Ferd = function(apiKey) {
  this.token = apiKey;
  this.messageHandler = MessageHandler();
  this.login();
};

/**
 * login() logs Ferd in
 *
 * @return {}
 */
Ferd.prototype.login = function() {
  this._api('rtm.start')
    .then(function(data) {
      this.url = data.url;
      this.self = data.self;
      this.team = data.team;
      this.users = data.users;
      this.connect();
    }.bind(this));
};

/**
 * connect() Opens up a connection to the web socket, and handles all types
 * of events.
 *
 * @return {}
 */
Ferd.prototype.connect = function() {
  this.ws = new WebSocket(this.url);
  this.ws.on('message', function(data, flags) {
    this.onMessage(data);
  }.bind(this));
};

/**
 * onMessage()
 *
 * @param  {String}
 * @return {}
 */
Ferd.prototype.onMessage = function(data) {
  var message = {};
  data = this.parse(data);
  if(data.ferd && data.ferd.agent === 'ferd' && data.ferd.module && this.messageHandler[data.ferd.module]) {
    message = this.messageHandler[data.ferd.module](data, this);
  }
};

/**
 * parse() parses data to JSON and appends ferd metadata
 * @param  {String} data
 * @return {Object}
 */
Ferd.prototype.parse = function(data) {
  data = JSON.parse(data);
  var re = /^(ferd)\s(\S*)\s*(.*)/;
  var m;
  if ((m = re.exec(data.text)) !== null) {
      if (m.index === re.lastIndex) {
          re.lastIndex++;
      }
  }
  if(m !== null) {
    data.ferd = {};
    data.ferd.agent = m[1];
    data.ferd.module = m[2];
    data.ferd.text = m[3];
  }
  return data;
};

/**
 * sendMessage() Sends a message to the general channel
 * @param {Object}
 * @return {}
 */
Ferd.prototype.sendMessage = function(params) {
  // var params = {
  //   channel: '#nicktron',
  //   text: 'nick is the best',
  //   as_user: true
  // };

  this._api('chat.postMessage', params)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log('error');
    });
};

/**
 * _api() A wrapper function for making calls to the Slack API
 *
 * @param  {String}
 * @param  {Object}
 * @return {Object}
 */
Ferd.prototype._api = function(methodName, params) {
  params = params || {};
  params = extend(params, {token: this.token});

  var path = methodName + '?' + qs.stringify(params);
  var data = { url: 'https://slack.com/api/' + path };

  return new Promise(function(resolve, reject) {
    request.get(data, function(err, request, body) {
      if (err) {
        reject(err);
        return false;
      } else {
        body = JSON.parse(body);
        resolve(body);
      }
    });
  });
};

module.exports = Ferd;
