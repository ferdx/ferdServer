module.exports = function(ferd) {
  var yoCount = 0;

  ferd.listen(/moo/, function(response) {
    var sender = response.getMessageSender();
    response.send("moomoo");
  });

};
