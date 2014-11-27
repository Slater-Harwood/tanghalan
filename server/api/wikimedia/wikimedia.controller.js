var request = require('request');

exports.show = function (req, res) {

  request({
    url: 'http://en.wikipedia.org/w/api.php?action=query&titles='+ req.params.slug + '&prop=images&imlimit=20&format=jsonfm'
  }, function (err, response, body) {
    if (response) {
      console.log(body);
      res.send(200, body);
    }
  });
};
