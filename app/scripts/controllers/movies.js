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
        $ionicLoading, $ionicPopup, $ionicModal, cinemasList) {
        $scope.cinemaLocation = $stateParams.cinemaLocation;
        $scope.doRefresh = doRefresh;

        console.log($stateParams.cinemaLocation);

        $scope.cinemas = cinemasList.cinemas;

        $ionicModal.fromTemplateUrl('templates/cinemas.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            if (!window.localStorage.cinema) {
                $scope.openModal();
            }
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function(cinemaObj) {
            window.localStorage.cinema = angular.toJson(cinemaObj);
            $scope.modal.hide();
            loadMovies();
        };

        $scope.closeModalOnly = function(cinemaObj) {
            $scope.modal.hide();
        };
        if (window.localStorage.cinema) {

            //start loading movies
            loadMovies();
        }


        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        function loadMovies() {
            $ionicLoading.show({
                template: '<ion-spinner class="bubbles"></ion-spinner>',
                noBackdrop: true
            });
            var cinemaObj = angular.fromJson(localStorage.cinema);
            $scope.cinemaLocation = cinemaObj.location;

            $http.get('http://api.moviesowl.com/v1/cinemas/' + cinemaObj.id +
                '/movies').then(function(response) {
                $rootScope.movies = response.data.data; //I dont actually use this anymore

                $scope.groups = [{
                    name: 'Good Movies',
                    style: 'balanced',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter >= 70;
                    }), 2)
                }, {
                    name: 'Less Good Movies',
                    style: 'energized',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter >= 50 && movie.tomato_meter < 70;
                    }), 2)
                }, {
                    name: 'Not Good Movies',
                    style: 'assertive',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter < 50 && movie.tomato_meter >= 0;
                    }), 2)
                }, {
                    name: 'No Rating Movies',
                    style: 'dark',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter < 0;
                    }), 2)
                }];
                
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
            $state.go('showings', {
                movieId: movie.id
            });
        };

        function doRefresh() {
            console.log('Reloading Movies');
            loadMovies();
        }
    });
