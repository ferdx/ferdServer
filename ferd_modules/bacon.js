var request = require('request');
var handler = function(data, ferd) {
  var url = 'https://baconipsum.com/api/?type=all-meat&paras=' + data.ferd.text;
  request(url, function (error, response, body) {
    ferd.sendMessage({
      channel: data.channel,
      as_user: true,
      text: "Hail Bacon!\n" + JSON.parse(body),
    });
  });
};

module.exports = function(data, ferd) {
  handler(data, ferd)
};
