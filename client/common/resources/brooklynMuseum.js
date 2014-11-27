angular.module('museumApp')
.factory('BrooklynMuseum', function($http, $q){
    var BrooklynMuseum = {};

    BrooklynMuseum.getCollection = function(slug){
      var apiURL = "/api/brooklynMuseum/" + slug;

      return $http.get(apiURL)
        .success(function (data) {
          console.log(data);
          return data;
        }, function (data, status) {
          return $q.reject('some error');
        });

    };
    return BrooklynMuseum;
  });
