'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:ShowingsCtrl
 * @description
 * # ShowingsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('MovieDetailsCtrl', function(ENV, $scope, $stateParams, $http, selectedMovieService, showingsDataService,
        $state, $q, $ionicModal, $rootScope, $ionicHistory, $timeout, craigalytics, $sce) {

        activate();

        function activate() {
            getMovie().then(function(movie) {
                $scope.movie = movie;
                craigalytics.send('VIEWED_MOVIE', {
                    name: movie.title
                });
            }).then(doStuff);
        }

        function getMovie() {

            if (selectedMovieService.selectedMovie.id) {
                return $q.when(selectedMovieService.selectedMovie);
            }
            return $http.get(ENV.apiEndpoint + 'cinemas/12/movies').then(function(response) {
                var movies = response.data.data;
                selectedMovieService.selectedMovie = _.find(movies, {
                    id: parseInt($stateParams.movieId)
                });
                return selectedMovieService.selectedMovie;
            });
        }


        function doStuff() {
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }


            console.log($scope.movie);
            $scope.linkTrailer = "https://www.youtube.com/embed/" + $scope.movie.trailer;
        }
    });
