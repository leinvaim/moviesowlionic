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
        $ionicLoading, $ionicPopup) {
        $scope.cinemaLocation = $stateParams.cinemaLocation;
        $scope.doRefresh = doRefresh;

        console.log($stateParams.cinemaLocation);
        $ionicLoading.show({
            template: '<ion-spinner class="bubbles"></ion-spinner>'
        });

        //start loading movies
        loadMovies();

        function loadMovies() {
            $http.get('http://api.moviesowl.com/v1/cinemas/' + $stateParams.cinemaId +
                '/movies').then(function(response) {
                $rootScope.movies = response.data.data; //I dont actually use this anymore

                $scope.groups = [
                    {
                        name: 'Great Movies',
                        style: 'balanced',
                        movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                            return movie.tomato_meter >= 70;
                        }), 2)
                    },
                    {
                        name: 'Fine Movies',
                        style: 'energized',
                        movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                            return movie.tomato_meter >= 50 && movie.tomato_meter < 70;
                        }), 2)
                    },
                    {
                        name: 'Bad Movies',
                        style: 'assertive',
                        movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                            return movie.tomato_meter < 50 && movie.tomato_meter >= 0;
                        }), 2)
                    },
                    {
                        name: 'No Rating Movies',
                        style: 'dark',
                        movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                            return movie.tomato_meter < 0;
                        }), 2)
                    }
                ];

                $scope.hasNoMovies = false;
                if (response.data.data.length < 1) {
                    $scope.hasNoMovies = true;
                }
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            }, function() {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                var alertPopup = $ionicPopup.alert({
                    title: 'Sorry :(',
                    template: 'Failed to load movies, /n Please try again!'
                });


            });
        }

        $scope.selectMovie = function(movie) {
            selectedMovieService.setMovie(movie);
            $state.go('movie', {
                movieId: movie.id
            });
        };

        function doRefresh() {
            console.log('Reloading Movies');
            loadMovies();
        }
    });
