'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('MoviesCtrl', function($scope, $http, $rootScope, $stateParams, selectedMovieService, $state,
        $ionicLoading) {
        $scope.cinemaLocation = $stateParams.cinemaLocation;
        console.log($stateParams.cinemaLocation);
        $ionicLoading.show({
            template: '<ion-spinner class="bubbles"></ion-spinner>'
        });
        $http.get('http://api.moviesowl.com/v1/cinemas/' + $stateParams.cinemaId + '/movies').then(function(response) {
            $rootScope.movies = response.data.data;
            $scope.movies = _.chunk($rootScope.movies, 2);
            $ionicLoading.hide();
        });
        $scope.selectMovie = function(movie) {
            selectedMovieService.setMovie(movie);
            $state.go('movie', {
                movieId: movie.id
            });
        };
    });
