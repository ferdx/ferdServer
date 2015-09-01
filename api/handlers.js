var handlers = {};

handler.update = function (req, res) {

  // extract data from req and
  // package data into json object

  var data = {

  };

  MegaFerd.process(data, function () {
    // callback
    res.end();
  });

};

module.exports = handlers;
