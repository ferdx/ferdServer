var handler = function(data, ferd) {
  ferd.sendMessage({
    channel: data.channel,
    as_user: true,
    text: 'hi',
  });
};

module.exports = function(data, ferd) {
  handler(data, ferd)
};
