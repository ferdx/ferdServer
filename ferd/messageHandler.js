var messageHandler = function(ferd_modules){
  this.handlers = {};
  for(var i = 0; i < ferd_modules.length; i++) {
    this.handlers[ferd_modules[i]] = require('ferd-' + ferd_modules[i]);
  }
};

messageHandler.prototype.getHandler = function(handlerName) {
  return this.handlers[handlerName];
}

messageHandler.prototype.addHandler = function(handlerName) {
  try {
    this.handlers[handlerName] = require('ferd-' + handlerName);
    return handlerName;
  } catch(e) {
    console.log('error addinghandler', handlerName);
    return null;
  }
};

messageHandler.prototype.removeHandler = function(handlerName) {
  try {
    delete this.handlers[handlerName]
    return handlerName;
  } catch(e) {
    console.log('error removing handler', handlerName);
    return null;
  }
};

messageHandler.prototype.getHandlers = function() {
  return Object.keys(this.handlers);
}

module.exports = messageHandler;
