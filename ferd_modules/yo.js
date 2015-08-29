
module.exports = function(data, ferd) {
  console.log(data);
  return {
    channel: data.channel,
    text: 'yo',
    as_user: true
  };
};
