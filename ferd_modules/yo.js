var handler = function(data, ferd) {
  ferd._api('users.info', {user: data.user})
  .then(function(res) {
    ferd.sendMessage({
      channel: data.channel,
      as_user: true,
      text: 'yo ' + res.user.name,
    });
  });
};

module.exports = function(data, ferd) {
  handler(data, ferd)
};
