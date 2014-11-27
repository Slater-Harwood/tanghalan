var request = require('request').defaults({encoding: null});
var apiKey = '';
var apiURL = 'http://www.brooklynmuseum.org/opencollection/api/' +
    '?method=archives.getImages&version=1&format=json&api_key=' + apiKey + '&keyword=';



/*
 host: "cdn2.brooklynmuseum.org",
 path: "/images/opencollection/archives/size2/PHO_INT_VIEW_AON_Hall_of_the_Americas_Mesoamerica_01_001_neg_bw.jpg"
 */
//data.response.archivesimages
exports.show = function (req, res) {
  request.get(apiURL + req.params.slug,
    function (error, response, body) {
      if (response) {
        var data = JSON.parse(body),
          images = data.response.archivesimages,
          imageData = [],
          imgObj = {};
        var len = Object.keys(images).length - 1;
        for (var i = 0; i < len; i++) {
          request.get(images[i].image_uri,
            function (error, response, body) {
              var base64Image = "data:" + response.headers["content-type"] +
                ";base64," + new Buffer(body).toString('base64');
              imageData.push(base64Image);
            });

        }
        var sendData = function () {
          if (imageData.length == len) {
            res.set('Content-Type', 'application/json');
            res.send(200, {images: imageData}).end();
          } else {
            setTimeout(sendData, 10);
          }
        };
        sendData();
      }
    });
};
