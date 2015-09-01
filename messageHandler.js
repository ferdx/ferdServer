var messageHandler = function(ferd_modules){
  this.handlers = {};
  for(var i = 0; i < ferd_modules.length; i++) {
    this.handlers[ferd_modules[i]] = require('ferd-' + ferd_modules[i]);
  }
};

messageHandler.prototype.getHandler = function(handlerName) {
  return this.handlers[handlerName];
}

module.exports = messageHandler;
