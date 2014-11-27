var request = require('request');

exports.show = function (req, res) {

  request({
    url: 'http://data.fitzmuseum.cam.ac.uk/doc/object/' + req.params.id + '.json'
  }, function (err, response, body) {
    if (response) {
      res.send(200, body);
    }
  });
};
