'use strict';

angular.module('museumApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('museum', {
        url: '/museum/:slug',
        templateUrl: 'app/museum/museum.html',
        controller: 'MuseumCtrl'
      });
  });
