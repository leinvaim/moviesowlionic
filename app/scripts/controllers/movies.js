'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
  .controller('MoviesCtrl', function ($scope, $http, $rootScope, $stateParams) {
        $scope.cinemaLocation = $stateParams.cinemaLocation;
        console.log($stateParams.cinemaLocation);
        // $http.get('http://api.moviesowl.com/v1/cinemas/12/movies?starting_after=1430870401').then(function(response) {
        $http.get('http://api.moviesowl.com/v1/cinemas/' + $stateParams.cinemaId + '/movies').then(function(response) {
            $rootScope.movies = response.data.data;
            $scope.movies = _.chunk($rootScope.movies, 2);
        });
  });
