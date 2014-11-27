/*
 fcd06a91fb45d1cbbeb7ab3f648a6648

 2d44ddad064d8fdb
 *//*


var request = require('request');

var Flickr = require("flickrapi");


exports.show = function (req, res) {
  var flickrOptions = {
    api_key: "fcd06a91fb45d1cbbeb7ab3f648a6648",
    secret: "2d44ddad064d8fdb"
  };

  Flickr.authenticate(flickrOptions, function (error, flickr) {
    request({
      url: 'http://data.fitzmuseum.cam.ac.uk/doc/object/' + req.params.id + '.json'
    }, function (err, response, body) {
      if (response) {
        console.log(body);
        res.send(200, body);
      }
    });
  });


};
*/
