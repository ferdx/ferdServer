/**
 * MessageHandler that creates new handlers for a Ferd object
 * @param  {[type]} ferd_modules [description]
 * @return {[type]}              [description]
 */
var MessageHandler = function(ferd_modules){
  this.handlers = {};
  for(var i = 0; i < ferd_modules.length; i++) {
    this.handlers[ferd_modules[i]] = require('ferd-' + ferd_modules[i]);
  }
};

/**
 * Getter for handler with key handlerName
 * @param  {String} handlerName
 * @return {Function}
 */
MessageHandler.prototype.getHandler = function(handlerName) {
  return this.handlers[handlerName];
}

/**
 * Setter for handler with key handlerName
 * @param  {String} handlerName
 * @return {String | null}
 */
MessageHandler.prototype.addHandler = function(handlerName) {
  try {
    this.handlers[handlerName] = require('ferd-' + handlerName);
    return handlerName;
  } catch(e) {
    console.log('error addinghandler', handlerName);
    return null;
  }
};

/**
 * Remover for handler with key handlerName
 * @param  {String} handlerName
 * @return {String | null}
 */
MessageHandler.prototype.removeHandler = function(handlerName) {
  try {
    delete this.handlers[handlerName]
    return handlerName;
  } catch(e) {
    console.log('error removing handler', handlerName);
    return null;
  }
};

/**
 * Getter for all keys of handlers
 * @return {Array[String]}
 */
MessageHandler.prototype.getHandlers = function() {
  return Object.keys(this.handlers);
}

module.exports = MessageHandler;
