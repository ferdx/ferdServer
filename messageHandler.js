module.exports = function(ferd_modules){
  var messageHandler = {};
  for(var i = 0; i < ferd_modules.length; i++) {
    messageHandler[ferd_modules[i]] = require('ferd-' + ferd_modules[i]);
  }
  console.log(messageHandler);
  return messageHandler;
};
