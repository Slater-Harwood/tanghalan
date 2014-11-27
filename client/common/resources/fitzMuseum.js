'use strict';

angular.module('museumApp')
  .factory('FitzMuseum', function ($q, $http) {
    var FitzMuseum = {};

    FitzMuseum.get = function(slug){
      var apiURL = "/api/fitzMuseum/" + slug;

      return $http.get(apiURL)
        .then(function (result) {
          return result.data;
        }, function (data, status) {
          return $q.reject('some error');
        });

    };
    return FitzMuseum;
  });
