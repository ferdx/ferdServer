module.exports = function(ferd) {
  var yoCount = 0;

  ferd.listen(/ferd yo/i, function(response) {
    var sender = response.getMessageSender();
    var name = 'Buddy';
    if (sender && sender.name) name = sender.name;
    if (sender && sender.profile && sender.profile.first_name) {
      name = sender.profile.first_name;
    }
    response.send(getRandomYo() + ', ' + name + '!');
    yoCount++;
  });

  ferd.listen(/how many yo?/i, function(response) {
    response.send("You've said yo " + yoCount + " times");
  });

  ferd.listen(/job me/i, function(response) {
    response.send('Find your own dam job!');
  });

  ferd.listen(/dammit Ferd/i, function(response) {
    var sender = response.getMessageSender();
    var name = 'pal';
    if (sender && sender.name) name = sender.name;
    if (sender && sender.profile && sender.profile.first_name) {
      name = sender.profile.first_name;
    }
    response.send('Hey! Watch your language, ' + name + '.');
  });

};

var randomYo = ['What\'s up', 'Hey', 'Yo', 'Hello', 'Hi', 'Howdy', 'G\'day', 'Bonjour'];
var getRandomYo = function() {
  return randomYo[Math.floor(Math.random() * randomYo.length)];
};
