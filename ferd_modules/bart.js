var bart = require('bart').createClient();
var _ = require('underscore');

var handler = function(data, ferd) {

  var stations = {
    '12th' : '12th St. Oakland City Center',
    '16th' : '16th St. Mission',
    '19th' : '19th St. Oakland',
    '24th' : '24th St. Mission',
    'ashb' : 'Ashby',
    'balb' : 'Balboa Park',
    'bayf' : 'Bay Fair',
    'cast' : 'Castro Valley',
    'civc' : 'Civic Center',
    'cols' : 'Coliseum/Oakland Airport',
    'colm' : 'Colma',
    'conc' : 'Concord',
    'daly' : 'Daly City',
    'dbrk' : 'Downtown Berkeley',
    'dubl' : 'Dublin/Pleasanton',
    'deln' : 'El Cerrito del Norte',
    'plza' : 'El Cerrito Plaza',
    'embr' : 'Embarcadero',
    'frmt' : 'Fremont',
    'ftvl' : 'Fruitvale',
    'glen' : 'Glen Park',
    'hayw' : 'Hayward',
    'lafy' : 'Lafayette',
    'lake' : 'Lake Merritt',
    'mcar' : 'MacArthur',
    'mlbr' : 'Millbrae',
    'mont' : 'Montgomery St.',
    'nbrk' : 'North Berkeley',
    'ncon' : 'North Concord/Martinez',
    'orin' : 'Orinda',
    'pitt' : 'Pittsburg/Bay Point',
    'phil' : 'Pleasant Hill',
    'powl' : 'Powell St.',
    'rich' : 'Richmond',
    'rock' : 'Rockridge',
    'sbrn' : 'San Bruno',
    'sfia' : 'San Francisco Intl Airport',
    'sanl' : 'San Leandro',
    'shay' : 'South Hayward',
    'ssan' : 'South San Francisco',
    'ucty' : 'Union City',
    'wcrk' : 'Walnut Creek',
    'wdub' : 'West Dublin',
    'woak' : 'West Oakland'
  };

  
  if(data.ferd.text === 'help') {
    var stationList = '```Here are a list of Bart station codes:\n\n';
    _.each(stations, function(station, i) {
      stationList += i + ' : ' + station + '\n';
    });
    ferd.sendMessage({
      channel: data.channel,
      as_user: true,
      text: stationList + '```',
      mrkdwn: true
    });
  } else {
    if(stations[data.ferd.text]) {
      var returnString = 'The following trains are scheduled to depart from *' + stations[data.ferd.text] + '* station:\n\n';
      bart.on(data.ferd.text, function(estimates){
        _.each(estimates, function(estimate) {
          returnString += '*Train: _' + estimate.destination + '_*\n'
                        + '```Direction: ' + estimate.direction + '\n'
                        + 'ETD: ' + estimate.minutes + ' minutes\n'
                        + '```\n\n\n';
        });
        ferd.sendMessage({
          channel: data.channel,
          as_user: true,
          text: returnString,
          mrkdwn: true
        });
      });
    } else {
      ferd.sendMessage({
        channel: data.channel,
        as_user: true,
        text: 'There is no Bart station with that station code. Please try again.',
        mrkdwn: true
      });
    }
  }
};

module.exports = function(data, ferd) {
  handler(data, ferd);
};