var request = require('request');
var handler = function(data, ferd) {
  var attachment = [{"text": "hey", "image_url": "http://media4.giphy.com/media/3Da4RFqzY7V3W/200.gif"}];
    ferd.sendMessage({
      channel: data.channel,
      as_user: true,
      attachments: JSON.stringify(attachment)
    });
};

module.exports = function(data, ferd) {
  handler(data, ferd)
};
